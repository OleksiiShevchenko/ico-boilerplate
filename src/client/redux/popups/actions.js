export const prefix = 'popups';

export const TOGGLE_MNEMONIC = `${prefix}/TOGGLE_MNEMONIC`;

export const toggleMnemonicPopup = isOpen => ({
  type: TOGGLE_MNEMONIC,
  data: isOpen,
});

