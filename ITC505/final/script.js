document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 5;
    const grid = document.getElementById('grid');

    function toggleDiagonalSquares(square) {
        const rowIndex = +square.getAttribute('data-row');
        const colIndex = +square.getAttribute('data-col');

        const directions = [
            { row: -1, col: -1 },
            { row: -1, col: 1 },
            { row: 1, col: -1 },
            { row: 1, col: 1 }
        ];

        for (const dir of directions) {
            const adjRow = rowIndex + dir.row;
            const adjCol = colIndex + dir.col;

            if (adjRow >= 0 && adjRow < gridSize && adjCol >= 0 && adjCol < gridSize) {
                const adjSquare = document.querySelector(`[data-row="${adjRow}"][data-col="${adjCol}"]`);
                adjSquare.classList.toggle('is-red');
            }
        }
    }

    function clearGrid() {
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
    }

    function generateGrid() {
        clearGrid();
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.setAttribute('data-row', i);
                square.setAttribute('data-col', j);
                square.addEventListener('click', () => {
                    toggleSquare(square);
                });
                grid.appendChild(square);
            }
        }
        animateGridBackground();
    }

    function toggleSquare(square) {
        square.classList.toggle('is-red');
        animateBackground(square);
        toggleDiagonalSquares(square);
    }

    function animateBackground(element) {
        element.animate(
            [
                { backgroundColor: 'black' },
                { backgroundColor: 'transparent' }
            ],
            {
                duration: 500,
                easing: 'ease-in-out'
            }
        );
    }

    function animateGridBackground() {
        const gridElement = document.querySelector('.grid');
        gridElement.animate(
            [
                { backgroundColor: '#f0f0f0' },
                { backgroundColor: '#ccc' }
            ],
            {
                duration: 500,
                easing: 'ease-in-out'
            }
        );
    }

    generateGrid();

    document.getElementById('resetButton').addEventListener('click', generateGrid);
});
