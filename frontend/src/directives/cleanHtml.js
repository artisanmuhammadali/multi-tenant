export default {
  mounted(el, binding) {
    const htmlString = binding.value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const unwanted = doc.querySelector('[data-f-id="pbf"]');
    if (unwanted) unwanted.remove();
    el.innerHTML = doc.body.innerHTML;
  },
};
