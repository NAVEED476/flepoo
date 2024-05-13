const slider = document.querySelector(".gallery");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", (_) => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", (_) => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const SCROLL_SPEED = 3;
      const walk = (x - startX) * SCROLL_SPEED;
      slider.scrollLeft = scrollLeft - walk;
    });

    function moveNext() {
      const images = slider.querySelectorAll("img");
      const currentImage = Array.from(images).findIndex(
        (img) => img.offsetLeft >= slider.scrollLeft
      );
      if (currentImage === images.length - 1) {
        // If it's the last image, scroll back to the first
        slider.scrollLeft = 0;
      } else {
        // Otherwise, scroll to the next image
        slider.scrollLeft = images[currentImage + 1].offsetLeft;
      }
    }

    setInterval(moveNext, 3000); // Auto slide every 3 seconds