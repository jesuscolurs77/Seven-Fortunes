import React, { createContext, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Toaster } from 'sonner-native';

import { registerHUD } from '@/services/feedback/feedback.service';
import { HUD, type HUDRef } from './hud/HUD';

const FeedbackContext = createContext<boolean>(true);

export function useFeedbackContext() {
  return useContext(FeedbackContext);
}

export interface FeedbackProviderProps {
  children: React.ReactNode;
}

function OverlayWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.overlayWrapper} pointerEvents="box-none">
      {children}
    </View>
  );
}

export function FeedbackProvider({ children }: FeedbackProviderProps) {
  const hudRef = useRef<HUDRef>(null);

  useEffect(() => {
    registerHUD((config) => {
      hudRef.current?.show(config);
    });
    return () => {
      registerHUD(() => {});
    };
  }, []);

  return (
    <FeedbackContext.Provider value={true}>
      {children}
      <Toaster
        position="top-center"
        swipeToDismissDirection="up"
        offset={Platform.OS === 'ios' ? 50 : 60}
        gap={8}
        visibleToasts={3}
        ToasterOverlayWrapper={OverlayWrapper}
        toastOptions={{
          style: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            elevation: 0,
            borderWidth: 0,
            padding: 0,
            margin: 0,
          },
        }}
      />
      <View style={styles.hudContainer} pointerEvents="none">
        <HUD ref={hudRef} />
      </View>
    </FeedbackContext.Provider>
  );
}

const styles = StyleSheet.create({
  hudContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999,
    elevation: 99999,
    pointerEvents: 'none',
  },
  overlayWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99998,
    elevation: 99998,
  },
});
