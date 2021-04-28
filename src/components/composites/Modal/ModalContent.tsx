import React from 'react';
import { Box, IBoxProps } from '../../primitives';
import { useThemeProps } from '../../../hooks';
import { ModalContext } from './Context';
import { Platform } from 'react-native';

const ModalContent = (props: IBoxProps, ref?: any) => {
  const { ...newProps } = useThemeProps('ModalContent', props);
  const {
    contentSize,
    initialFocusRef,
    finalFocusRef,
    handleClose,
  } = React.useContext(ModalContext);
  React.useEffect(() => {
    let finalRefVal = finalFocusRef ? finalFocusRef.current : null;
    if (initialFocusRef && initialFocusRef.current) {
      //@ts-ignore
      initialFocusRef.current.focus();
    }

    return () => {
      if (finalRefVal) {
        //@ts-ignore
        finalRefVal.focus();
      }
    };
  }, [initialFocusRef, finalFocusRef]);

  return (
    <Box
      {...contentSize}
      {...newProps}
      ref={ref}
      onAccessibilityEscape={handleClose}
      //@ts-ignore - web only
      aria-modal="true"
      //@ts-ignore - web only
      accessibilityRole={Platform.OS === 'web' ? 'dialog' : undefined}
      accessibilityViewIsModal
    />
  );
};

export default React.memo(React.forwardRef(ModalContent));
