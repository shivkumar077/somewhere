import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CANONICAL_WORLD } from './world/worldData';
import {
  ATMOSPHERE_PRESETS,
  AtmosphereMode,
  getAtmosphereFromLocalTime,
} from './config/atmosphereConfig';
import { SceneCanvas, ViewMode } from './components/canvas/SceneCanvas';
import { WelcomeOverlay } from './components/ui/WelcomeOverlay';
import { AtmosphereControls } from './components/ui/AtmosphereControls';
import { BlockTransition } from './components/ui/BlockTransition';
import { FallbackView } from './components/ui/FallbackView';
import { BuildingItem } from './world/types';

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('miniature');

  // Interactive inspection state
  const [hoveredBuilding, setHoveredBuilding] = useState<BuildingItem | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingItem | null>(null);

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

  const handleSetMode = useCallback((mode: AtmosphereMode, auto: boolean) => {
    setIsAutoTime(auto);
    if (auto) {
      setAtmosphereMode(getAtmosphereFromLocalTime());
    } else {
      setAtmosphereMode(mode);
    }
  }, []);

  const handleEnter = useCallback(() => {
    if (isTransitioning || isEntered) return;
    setIsEntering(true);
    setIsTransitioning(true);
  }, [isTransitioning, isEntered]);

  const handleTransitionPeak = useCallback(() => {
    setIsEntered(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const handleReturnToOrbit = useCallback(() => {
    setIsEntered(false);
    setIsEntering(false);
    setViewMode('miniature');
  }, []);

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
      {/* 1. 3D Scene Canvas */}
      <SceneCanvas
        world={CANONICAL_WORLD}
        atmosphere={currentAtmosphere}
        isEntering={isEntering}
        isEntered={isEntered}
        viewMode={viewMode}
        onHoverBuilding={setHoveredBuilding}
        onSelectBuilding={setSelectedBuilding}
      />

      {/* 2. Top-Right Atmosphere Mode Switcher */}
      <AtmosphereControls
        currentMode={atmosphereMode}
        isAuto={isAutoTime}
        localTimeFormatted={formattedTime}
        onSetMode={handleSetMode}
      />

      {/* 3. Welcome Message & ENTER Overlay */}
      <WelcomeOverlay
        isEntered={isEntered}
        isTransitioning={isTransitioning}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(v => v === 'miniature' ? 'walkable' : 'miniature')}
        onEnter={handleEnter}
        onReturnToOrbit={handleReturnToOrbit}
        hoveredBuilding={hoveredBuilding}
        selectedBuilding={selectedBuilding}
        onClearSelectedBuilding={() => setSelectedBuilding(null)}
      />

      {/* 4. Playful Mosaic Block Transition */}
      <BlockTransition
        isActive={isTransitioning}
        onTransitionPeak={handleTransitionPeak}
        onTransitionComplete={handleTransitionComplete}
      />
    </div>
  );
};
