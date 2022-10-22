function updateTable(arr) {
    let table = document.getElementById("sudoku-table").tBodies[0];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let data = arr[row * 9 + col];
            data = data >= 1 && data <= 9 ? data : "";
            table.rows[row].cells[col].innerHTML = data;
        }
    }
}

import init, { complete_sudoku } from './sudoku.js';

document.getElementById("populate").onclick = async () => {
    let response = await fetch('https://sugoku.herokuapp.com/board?difficulty=easy');
    let raw_json = await response.json();
    let data = raw_json.board.reduce((arr, curr) => arr.concat(curr));
    updateTable(data);
};

document.getElementById("solve").onclick = async () => {
    await init();
    let data = Array(81);
    let table = document.getElementById("sudoku-table").tBodies[0];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            data[row * 9 + col] = table.rows[row].cells[col].innerHTML;
        }
    }
    let res = complete_sudoku(data);
    updateTable(res);
};

document.getElementById("clear").onclick = async () => {
    updateTable(Array(81));
};
