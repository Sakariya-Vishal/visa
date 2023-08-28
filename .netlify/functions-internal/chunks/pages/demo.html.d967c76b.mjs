/* empty css                                                                        */
function render({ slots: ___SLOTS___ }) {
		return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title>Blurred Background and Popup</title>
</head>
<body class="bg-white flex justify-center items-center h-screen backdrop-blur-3xl">

    <!-- Blurred background -->
    <div class="absolute inset-0 z-10 backdrop-blur-3xl">
        asdf sdf asdf asdf
    </div>

    <!-- Popup container -->
    <div class="relative z-20">
        <button id="openPopup" class="px-4 py-2 bg-blue-500 text-white">Open Popup</button>
        <div id="popup" class="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md">
            <p>This is a popup content.</p>
            <button id="closePopup" class="mt-4 px-4 py-2 bg-red-500 text-white">Close Popup</button>
        </div>
    </div>

    <script>
        const openPopupButton = document.getElementById('openPopup');
        const closePopupButton = document.getElementById('closePopup');
        const popup = document.getElementById('popup');

        openPopupButton.addEventListener('click', () => {
            popup.classList.remove('hidden');
        });

        closePopupButton.addEventListener('click', () => {
            popup.classList.add('hidden');
        });
    </script>
</body>
</html>
`
	}
render["astro:html"] = true;

export { render as default };
