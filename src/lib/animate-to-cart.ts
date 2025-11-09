interface AnimateToCartOptions {
  sourceElement: HTMLElement;
  targetElement: HTMLElement;
}

export const animateToCart = ({ sourceElement, targetElement }: AnimateToCartOptions) => {
  // Create a clone of the source element
  const clone = sourceElement.cloneNode(true) as HTMLElement;
  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  // Style the clone
  clone.style.position = 'fixed';
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  clone.style.transform = 'scale(1)';
  clone.style.transition = 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
  clone.style.pointerEvents = 'none';
  clone.style.zIndex = '100';

  // Add the clone to the document
  document.body.appendChild(clone);

  // Create a ripple effect
  const ripple = document.createElement('div');
  ripple.style.position = 'absolute';
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.width = '0';
  ripple.style.height = '0';
  ripple.style.borderRadius = '50%';
  ripple.style.backgroundColor = 'rgba(var(--primary), 0.2)';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.animation = 'ripple 0.5s ease-out forwards';
  sourceElement.style.position = 'relative';
  sourceElement.appendChild(ripple);

  // Add ripple animation to document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      0% {
        width: 0;
        height: 0;
        opacity: 0.5;
      }
      100% {
        width: 200%;
        height: 200%;
        opacity: 0;
      }
    }

    @keyframes bounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);

  // Make the target cart icon bounce
  targetElement.style.animation = 'bounce 0.5s ease-in-out';

  // Animate the clone to the cart
  requestAnimationFrame(() => {
    clone.style.transform = `
      translate(
        ${targetRect.left - sourceRect.left}px,
        ${targetRect.top - sourceRect.top}px
      ) 
      scale(0.1)
    `;
    clone.style.opacity = '0';
  });

  // Clean up
  setTimeout(() => {
    clone.remove();
    ripple.remove();
    style.remove();
    targetElement.style.animation = '';
  }, 750);
};