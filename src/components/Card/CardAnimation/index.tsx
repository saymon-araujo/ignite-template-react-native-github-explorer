import React, { useEffect } from "react";
import { useWindowDimensions, ViewProps } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AnimationContainer } from "./styles";

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(cardOpacity.value, { duration: 1000 }),
      transform: [
        { translateX: withTiming(cardOffset.value, { duration: 1000 }) },
      ],
    };
  });

  useEffect(() => {
    cardOpacity.value = 1;
    cardOffset.value = 0;
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  );
}
