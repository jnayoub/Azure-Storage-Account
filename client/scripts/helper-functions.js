function createElementWithOptions(newElementObject) {
    const element = document.createElement(newElementObject.tag);
  
    if (newElementObject.attributeKeys && newElementObject.attributeValues) {
      for (let i = 0; i < newElementObject.attributeKeys.length; i++) {
        const attribute = newElementObject.attributeKeys[i];
        const attributeValue = newElementObject.attributeValues[i];
        element.setAttribute(attribute, attributeValue);
      }
    }
  
    if (newElementObject.classList) {
      for (let i = 0; i < newElementObject.classList.length; i++) {
        const className = newElementObject.classList[i];
        element.classList.add(className);
      }
    }
  
    if (newElementObject.eventListeners) {
      for (let i = 0; i < newElementObject.eventListeners.length; i++) {
        const event = newElementObject.eventListeners[i][0];
        const listener = newElementObject.eventListeners[i][1];
        element.addEventListener(event, listener);
      }
    }
  
    if (newElementObject.textContent) {
      element.textContent = newElementObject.textContent;
    }
  
    if (newElementObject.containerDiv) {
      document.querySelector(newElementObject.containerDiv).appendChild(element);
    }
  
    return element;
  }
  
  