"use client";

import { useEffect } from "react";

const revealSelector = "main section, main article, main [data-scroll-reveal], main .product-card";

export function MotionEnhancements() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 },
    );

    function observeWithin(root: ParentNode) {
      if (root instanceof Element && root.matches(revealSelector) && !observed.has(root)) {
        root.classList.add("scroll-reveal");
        observed.add(root);
        observer.observe(root);
      }

      root.querySelectorAll(revealSelector).forEach((element) => {
        if (observed.has(element)) return;
        element.classList.add("scroll-reveal");
        observed.add(element);
        observer.observe(element);
      });
    }

    observeWithin(document);
    document.documentElement.dataset.motionReady = "true";

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) observeWithin(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      observed.forEach((element) => element.classList.remove("scroll-reveal", "is-visible"));
      delete document.documentElement.dataset.motionReady;
    };
  }, []);

  return null;
}
