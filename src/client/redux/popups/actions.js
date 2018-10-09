export const prefix = 'popups';

export const TOGGLE_MNEMONIC = `${prefix}/TOGGLE_MNEMONIC`;

export const toggleMnemonicPopup = isOpen => ({
  type: TOGGLE_MNEMONIC,
  data: isOpen,
});


export const TOGGLE_TRANSACTION = `${prefix}/TOGGLE_TRANSACTION`;

export const toggleTransactionPopup = isOpen => ({
  type: TOGGLE_TRANSACTION,
  data: isOpen,
});

