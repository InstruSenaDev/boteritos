<script>
  document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggleButton');
    const sidebarText = document.getElementById('sidebar-text');
    const elements = document.querySelectorAll('.sidebar-element span');

    toggleButton.addEventListener('click', () => {
      if (sidebar.classList.contains('w-[280px]')) {
        sidebar.classList.remove('w-[280px]');
        sidebar.classList.add('w-[95px]');
        sidebarText.classList.add('hidden');
        elements.forEach(element => {
          element.classList.add('hidden');
        });
        toggleButton.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
      } else {
        sidebar.classList.remove('w-[95px]');
        sidebar.classList.add('w-[280px]');
        sidebarText.classList.remove('hidden');
        elements.forEach(element => {
          element.classList.remove('hidden');
        });
        toggleButton.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
      }
    });
  });
</script>