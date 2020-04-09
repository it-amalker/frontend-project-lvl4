// delays

const setResetDelay = (f, ms) => setTimeout(f, ms);

const setSelect = (el) => () => setTimeout(() => el.current.select(), 200);

export { setResetDelay, setSelect };
