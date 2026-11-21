import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CANONICAL_WORLD } from './world/worldData';
import {
  ATMOSPHERE_PRESETS,
  AtmosphereMode,
  getAtmosphereFromLocalTime,
} from './config/atmosphereConfig';
import { SceneCanvas, ViewMode } from './components/canvas/SceneCanvas';
import { WelcomeOverlay } from './components/ui/WelcomeOverlay';
import { TownHUD } from './components/ui/TownHUD';
import { DestinationModal } from './components/ui/DestinationModal';
import { NPCDialogueModal } from './components/ui/NPCDialogueModal';
import { AudioControl } from './components/ui/AudioControl';
import { AtmosphereControls } from './components/ui/AtmosphereControls';
import { FallbackView } from './components/ui/FallbackView';
import { BuildingItem, NPCEntity, DestinationType } from './world/types';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import { audioManager } from './utils/audioManager';

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const App: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  // Time & Atmosphere state
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [atmosphereMode, setAtmosphereMode] = useState<AtmosphereMode>(() =>
    getAtmosphereFromLocalTime()
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  // Interactive Enter / Navigation state
  const [isEntering, setIsEntering] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('miniature');

  // Interactive inspection and modal states
  const [hoveredBuilding, setHoveredBuilding] = useState<BuildingItem | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingItem | null>(null);
  const [selectedNPC, setSelectedNPC] = useState<NPCEntity | null>(null);

  // Walkable Character Movement Engine
  const {
    position: playerPosition,
    rotationY: playerRotation,
    isWalking,
    targetPoint,
    nearbyDestination,
    nearbyNPC,
    setMoveTarget,
    navigateToDestination,
  } = usePlayerMovement(CANONICAL_WORLD, isEntered);

  // Check WebGL on mount
  useEffect(() => {
    setHasWebGL(checkWebGLSupport());
  }, []);

  // Update local time and sync atmosphere if isAutoTime is active
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      if (isAutoTime) {
        setAtmosphereMode(getAtmosphereFromLocalTime(now));
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [isAutoTime]);

  // Keyboard shortcut [E] for interacting with nearby building or NPC
  useEffect(() => {
    if (!isEntered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyE') {
        if (selectedBuilding || selectedNPC) return;
        if (nearbyDestination && nearbyDestination.destinationRole) {
          setSelectedBuilding(nearbyDestination);
        } else if (nearbyNPC) {
          setSelectedNPC(nearbyNPC);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEntered, nearbyDestination, nearbyNPC, selectedBuilding, selectedNPC]);

  const handleSetMode = useCallback((mode: AtmosphereMode, auto: boolean) => {
    setIsAutoTime(auto);
    if (auto) {
      setAtmosphereMode(getAtmosphereFromLocalTime());
    } else {
      setAtmosphereMode(mode);
    }
  }, []);

  // Continuous Camera Fly-In Zoom into the exact same physical world
  const handleEnter = useCallback(() => {
    if (isEntering || isEntered) return;
    // Seamless audio play: does not restart or create duplicate nodes if already playing
    audioManager.ensurePlaying().catch(() => {});
    setIsEntering(true);

    // Continuous camera glide over 2.1s then reveal TownHUD
    setTimeout(() => {
      setIsEntered(true);
      setIsEntering(false);
      setViewMode('walkable');
    }, 2100);
  }, [isEntering, isEntered]);

  // Smooth return to orbit view
  const handleReturnToOrbit = useCallback(() => {
    setIsEntered(false);
    setIsEntering(false);
    setViewMode('miniature');
    setSelectedBuilding(null);
    setSelectedNPC(null);
  }, []);

  const handleNavigateToDestination = useCallback(
    (destRole: DestinationType) => {
      setSelectedNPC(null);
      navigateToDestination(destRole);
    },
    [navigateToDestination]
  );

  const handleGroundClick = useCallback(
    (point: [number, number, number]) => {
      setMoveTarget(point[0], point[2]);
    },
    [setMoveTarget]
  );

  const formattedTime = useMemo(() => {
    return currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [currentDate]);

  const currentAtmosphere = ATMOSPHERE_PRESETS[atmosphereMode];

  if (hasWebGL === false) {
    return <FallbackView reason="WebGL context could not be created on this browser session." />;
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* 1. Persistent Audio Control (Top-Left) */}
      <div
        style={{
          position: 'absolute',
          top: 'max(14px, var(--sat))',
          left: 'max(14px, var(--sal))',
          zIndex: 35,
          pointerEvents: 'auto',
        }}
      >
        <AudioControl />
      </div>

      {/* 2. Top-Right Atmosphere Mode Switcher */}
      <AtmosphereControls
        currentMode={atmosphereMode}
        isAuto={isAutoTime}
        localTimeFormatted={formattedTime}
        onSetMode={handleSetMode}
      />

      {/* 3. 3D Scene Canvas — Continuous Cel-Shaded Messenger-Style World */}
      <SceneCanvas
        world={CANONICAL_WORLD}
        atmosphere={currentAtmosphere}
        isEntering={isEntering}
        isEntered={isEntered}
        viewMode={viewMode}
        playerPosition={playerPosition}
        playerRotation={playerRotation}
        isWalking={isWalking}
        targetPoint={targetPoint}
        onGroundClick={handleGroundClick}
        onHoverBuilding={setHoveredBuilding}
        onSelectBuilding={setSelectedBuilding}
        onSelectNPC={setSelectedNPC}
      />

      {/* 4. Landing Welcome Message & ENTER Overlay (Hidden when entered) */}
      <WelcomeOverlay
        isEntered={isEntered}
        isTransitioning={isEntering}
        onEnter={handleEnter}
        hoveredBuilding={hoveredBuilding}
        selectedBuilding={selectedBuilding}
        onClearSelectedBuilding={() => setSelectedBuilding(null)}
      />

      {/* 5. Living Town HUD (Compass, Destinations, Prompts) */}
      {isEntered && (
        <TownHUD
          nearbyDestination={nearbyDestination}
          nearbyNPC={nearbyNPC}
          onOpenDestination={setSelectedBuilding}
          onOpenNPC={setSelectedNPC}
          onNavigateToDestination={handleNavigateToDestination}
          onReturnToOrbit={handleReturnToOrbit}
          playerPosition={playerPosition}
        />
      )}

      {/* 6. Destination Detail Modal Drawer */}
      <DestinationModal
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
      />

      {/* 7. NPC Story Dialogue Modal */}
      <NPCDialogueModal
        npc={selectedNPC}
        onClose={() => setSelectedNPC(null)}
        onNavigateToDestination={handleNavigateToDestination}
      />
    </div>
  );
};
