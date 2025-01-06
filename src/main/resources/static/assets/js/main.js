/**
* Template Name: Mentor
* Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();

document.addEventListener("DOMContentLoaded", () => {
  const descriptionElements = document.querySelectorAll(".course-description");
  
  descriptionElements.forEach((descriptionElement) => {
    const text = descriptionElement.textContent.trim();
    
    // Split the text into words and limit to 50
    const words = text.split(" ");
    if (words.length > 50) {
      descriptionElement.textContent = words.slice(0, 35).join(" ") + ".";
    }
  });
});


async function fetchRole() {
  const token = localStorage.getItem("authToken");
  console.log(token);
  if (!token) {
      console.log("No token found in localStorage");
      return null;  // If no token, return null
  }

  try {
      const response = await fetch("api/users/getrole", {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`
          }
      });
      console.log(response);
      if (!response.ok) {
          throw new Error("Failed to fetch role");
      }

      const role = await response.text();  // Assuming role is returned as plain text (like "ADMIN")
      return role;
  } catch (error) {
      console.error("Error fetching role:", error);
      return null;
  }
}

async function displayAdminContent() {
  const role = await fetchRole();
  const adminSections = document.querySelectorAll(".adminSection");

  adminSections.forEach(section => {
      section.style.display = role === "ROLE_ADMIN" ? "block" : "none";
  });
}




    async function fetchUsername() {
        const token = localStorage.getItem("authToken");
        console.log("Token from localStorage:", token);  // Token check
        if (!token) {
            document.getElementById("loginButtons").style.display = "block";
            document.getElementById("userGreeting").style.display = "none";
            return;
        }
        try {
            const response = await fetch("/api/users/name", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const username = await response.text();
                document.getElementById("usernameText").textContent = username;
                document.getElementById("userGreeting").style.display = "block";
                document.getElementById("loginButtons").style.display = "none";
                document.getElementById("logoutContainer").style.display="block";
                const registerIndexButton = document.getElementById("registerIndexButton");
                if (registerIndexButton) {
                  registerIndexButton.style.display = "none";
              }
            }
        } catch (error) {
            console.error("Error fetching username:", error);
        }
    }
    document.addEventListener("DOMContentLoaded",() =>{
        fetchUsername();
        displayAdminContent();
    });

    document.getElementById('logoutButton')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('authToken'); // Remove token from local storage
      window.location.href = '/index'; // Redirect to home page after logout
    });


	window.addEventListener("beforeunload", function (event) {
		// Send logout request to server

		// Clear any session/local storage if used
		sessionStorage.clear();
		localStorage.removeItem('authToken'); // Optional if you store tokens
	});


    