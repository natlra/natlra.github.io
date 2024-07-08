document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const width = 4;
    let squares = [];

    // Create the board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.classList.add('grid-cell');
            gridContainer.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    // Generate a new number
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == "") {
            squares[randomNumber].innerHTML = 2;
            squares[randomNumber].classList.add('tile-2');
        } else generate();
    }

    // Update the display of tiles
    function updateDisplay() {
        squares.forEach(square => {
            const value = parseInt(square.innerHTML);
            square.className = 'grid-cell';
            if (value) {
                square.classList.add(`tile-${value}`);
            } else {
                square.innerHTML = "";
            }
        });
    }

    // Combine row tiles
    function combineRow() {
        for (let i = 0; i < width * width - 1; i++) {
            if (i % 4 !== 3) {
                if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                    squares[i].innerHTML = combinedTotal;
                    squares[i + 1].innerHTML = 0;
                }
            }
        }
    }

    // Combine column tiles
    function combineColumn() {
        for (let i = 0; i < width * (width - 1); i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
            }
        }
    }

    // Move right
    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i + 1].innerHTML),
                    parseInt(squares[i + 2].innerHTML),
                    parseInt(squares[i + 3].innerHTML)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0] || "";
                squares[i + 1].innerHTML = newRow[1] || "";
                squares[i + 2].innerHTML = newRow[2] || "";
                squares[i + 3].innerHTML = newRow[3] || "";
            }
        }
    }

    // Move left
    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i + 1].innerHTML),
                    parseInt(squares[i + 2].innerHTML),
                    parseInt(squares[i + 3].innerHTML)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0] || "";
                squares[i + 1].innerHTML = newRow[1] || "";
                squares[i + 2].innerHTML = newRow[2] || "";
                squares[i + 3].innerHTML = newRow[3] || "";
            }
        }
    }

    // Move down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + (width * 2)].innerHTML),
                parseInt(squares[i + (width * 3)].innerHTML)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0] || "";
            squares[i + width].innerHTML = newColumn[1] || "";
            squares[i + (width * 2)].innerHTML = newColumn[2] || "";
            squares[i + (width * 3)].innerHTML = newColumn[3] || "";
        }
    }

    // Move up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + width].innerHTML),
                parseInt(squares[i + (width * 2)].innerHTML),
                parseInt(squares[i + (width * 3)].innerHTML)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0] || "";
            squares[i + width].innerHTML = newColumn[1] || "";
            squares[i + (width * 2)].innerHTML = newColumn[2] || "";
            squares[i + (width * 3)].innerHTML = newColumn[3] || "";
        }
    }

    // Control the keys
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
        updateDisplay();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
        updateDisplay();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
        updateDisplay();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
        updateDisplay();
    }

    createBoard();
});
