export const getProperty = (element, property) => {
    // Get the computed style of the element
    const computedStyle = window.getComputedStyle(element);

    // Get the individual padding values (top, right, bottom, left)
    const prop = computedStyle.getPropertyValue(property);

    // Convert the values to numbers by removing units (e.g., 'px')
    return parseFloat(prop);
};