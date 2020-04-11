// delays

const setResetDelay = (f, ms) => setTimeout(f, ms);

const setSelected = (el) => () => setTimeout(() => el.current.select(), 200);

export { setResetDelay, setSelected };
