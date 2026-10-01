/* Only pin the platform introduction when the entire copy fits below the header. */
document.addEventListener('DOMContentLoaded', () => {
    const platform = document.querySelector('.sec5.platform');
    const copy = platform?.querySelector('.fixed_area_inner');
    if (!copy) return;

    const updateCopyLayout = () => {
        const headerHeight = document.querySelector('#roof')?.offsetHeight || 100;
        const fits = window.innerWidth > 1023 && copy.offsetHeight <= window.innerHeight - headerHeight;
        platform.classList.toggle('platform-copy-fits', fits);
    };

    new ResizeObserver(updateCopyLayout).observe(copy);
    window.addEventListener('resize', updateCopyLayout);
    window.addEventListener('load', updateCopyLayout);
    document.fonts?.ready.then(updateCopyLayout);
    updateCopyLayout();
});
