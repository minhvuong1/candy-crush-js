document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    let score = 0;

    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue',
    ]

    // Create the board
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)

            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundColor = candyColors[randomColor]

            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    // Drag the candies
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(e) {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged)
        console.log(this.id, 'dragStart')
    }

    function dragEnd() {
        console.log(this.id, 'dragEnd')
        let validMoves = [
            squareIdBeingDragged - 1, 
            squareIdBeingDragged - width, 
            squareIdBeingDragged + width, 
            squareIdBeingDragged + width, 
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squaresIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }

    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, 'dragOver')
    }

    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, 'dragEnter')
    }

    function dragLeave() {
        console.log(this.id, 'dragLeave')
    }

    function dragDrop() {
        console.log(this.id, 'dragDrop')
        colorBeingReplaced = this.style.backgroundColor
        sqaureIdBeingReplaced = parseInt(this.id)
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
    }

    // Checking for matches 
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                rowOfThree.forEach(index => {  
                    squares[index].style.backgroundColor = 'white'
                })
            }
        }
    }
    checkRowForThree()

    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                columnOfThree.forEach(index => {  
                    squares[index].style.backgroundColor = 'white'
                })
            }
        }
    }
    checkColumnForThree()

    function checkRowForFour() {
        for (i = 0; i < 61; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                rowOfFour.forEach(index => {  
                    squares[index].style.backgroundColor = 'white'
                })
            }
        }
    }
    checkRowForFour()

    function checkColumnForFour() {
        for (i = 0; i < 47; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                columnOfFour.forEach(index => {  
                    squares[index].style.backgroundColor = 'white'
                })
            }
        }
    }
    checkColumnForFour()

    function checkRowForFive() {
        for (i = 0; i < 61; i++) {
            let rowOfFive = [i, i+1, i+2, i+3, i+4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 19, 21, 22, 23, 28, 29, 30, 31, 35, 36, 37, 38, 39, 43, 44, 45, 46, 47, 52, 53, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                rowOfFive.forEach(index => {  
                    squares[index].style.backgroundColor = 'white'
                })
            }
        }
    }
    checkRowForFive()

    function checkColumnForFive() {
        for (i = 0; i < 47; i++) {
            let columnOfFive = [i, i+width, i+width*2, i+width*3, i+width*4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                columnOfFive.forEach(index => {  
                    squares[index].style.backgroundColor = 'white'
                })
            }
        }
    }
    checkColumnForFive()

    window.setInterval(() => {
        checkRowForFive()
        checkColumnForFive()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 100)

})

