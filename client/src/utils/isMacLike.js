export default () => {
    return navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
}
