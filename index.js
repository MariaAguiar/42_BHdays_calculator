var map = new Map();
var levelXP = new Map();

//map current Common Core projects and their XP
map.set('Libft', 462);
map.set('ft_printf', 882);
map.set('get_next_line', 882);
map.set('born_2_be_root', 577);
map.set('push_swap', 1855);
map.set('minitalk / pipex', 1142);
map.set('FdF / fractol / so_long', 1000);
map.set('philosophers', 3360);
map.set('minishell', 2814);
map.set('netpractice', 3160);
map.set('cub3D / miniRT', 5775);
map.set('cpp04', 9600);
map.set('cpp09', 10042);
map.set('inception', 10042);
map.set('ft_irc / webserv', 21630);
map.set('ft_transcendence', 24360);

levelXP.set(0, 0);
levelXP.set(1, 462);
levelXP.set(2, 2688);
levelXP.set(3, 5885);
levelXP.set(4, 11777);
levelXP.set(5, 29217);
levelXP.set(6, 46255);
levelXP.set(7, 63559);
levelXP.set(8, 74340);
levelXP.set(9, 85483);
levelXP.set(10, 95000);


// Display projects from the map
document.addEventListener('DOMContentLoaded', () => {
    const datalist = document.querySelector('datalist');

    map.forEach((value, key) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        datalist.appendChild(option);
    });
});

// Allow dragging of rows
var row;
function dragstart(event) {
    row = event.target;
  }

function dragover(event) {
event.preventDefault();
var target = event.target.closest('.content');
if (target && target !== row) {
        let rows = Array.from(target.parentNode.children);
        let rowIndex = rows.indexOf(row);
        let targetIndex = rows.indexOf(target);

        if (rowIndex < targetIndex) {
        target.after(row);
        } else {
        target.before(row);
        }
        const num = document.querySelectorAll(".content");
        for (var i = 0; i < num.length; i++)
        {
            if (i > 0)
                num[i].children[1].children[0].readOnly = 'true';
            else
                num[i].children[1].children[0].removeAttribute('readOnly');
        }
    }
}


//Add new rows to the table
document.getElementById('addRow').addEventListener('click', function() {
    const count = document.querySelectorAll(".content");
    if (count.length >= map.size)
        return ;
    var tableBody = document.querySelector('tbody');
    var newRow = document.createElement('tr');
    newRow.classList.add("content");
    newRow.draggable = true;
    newRow.addEventListener('dragstart', dragstart);
    newRow.addEventListener('dragover', dragover);

    for (var i = 0; i < 7; i++) {
        var newCell = document.createElement('td');
        if (i == 0)
        {
            var icon = document.createElement('img');
            icon.draggable = false;
            icon.src = 'dragIcon.png';
            icon.alt = 'drag icon';
            newCell.appendChild(icon);
            newRow.appendChild(newCell);
            continue ;
        }
        var input = document.createElement('input');
        if (i == 1 || i == 5 || i == 6)
            input.readOnly = 'true';
        if (i == 2)
        {
            input.setAttribute('list', "projects");
            input.classList.add("projects-field");
        }
        else if (i != 4)
            input.type = 'text';
        else
            input.type = 'checkbox';
        input.name = `col${i + 1}[]`;
        newCell.appendChild(input);
        newRow.appendChild(newCell);
    }
    tableBody.appendChild(newRow);
});


// 42 Evaluator's calculator logic
document.getElementById('calculator').addEventListener('click', function() {
    const rows = document.querySelectorAll(".content");
    for (var i = 0; i < rows.length; i++)
    {
        if (i != 0)
            rows[i].children[1].children[0].value = rows[i - 1].children[6].children[0].value;
        let startLevel = parseFloat(rows[i].children[1].children[0].value).toFixed(2);
        let project = rows[i].children[2].children[0].value;
        let grade = rows[i].children[3].children[0].value;
        let bonus = rows[i].children[4].children[0].checked;
        let midLevel = levelXP.get(Math.ceil(startLevel)) - levelXP.get(Math.floor(startLevel));
        let userXP = levelXP.get(Math.floor(startLevel)) + midLevel
            * (parseFloat(startLevel - Math.floor(startLevel)).toFixed(2));
        console.log(userXP);
        let bonusXP = (bonus == true) ? 1.042 : 1;
        let newXP = userXP + bonusXP*map.get(project)*(parseInt(grade) / 100);
        console.log(newXP);
        let levelForXP, j;
        for (j = 0; j < levelXP.size; j++) {
            if (levelXP.get(j) > newXP) {
                levelForXP = j - 1;
                break;
            }
        }
        if (midLevel == 0)
            midLevel = levelXP.get(j);
        let newLevel = (levelForXP + (newXP - levelXP.get(levelForXP))/ midLevel).toFixed(2);
        let BHdays = parseInt((((Math.min(newXP, 78880)/49980)**0.45)-((userXP/49980)**0.45))*483);
        rows[i].children[5].children[0].value = BHdays;
        rows[i].children[6].children[0].value = newLevel;
    }
});
