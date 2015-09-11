(function () {
	angular.module("8p", []).controller("MainController", MainController);
	
	function MainController() {
	
		var vm = this;
		
		vm.win = false;
		vm.log = "";
		vm.rows = [];
		
		vm.move = move;
		
		init();
		
		function init() {
			vm.rows = [
				{ 
					cells: [
						{ id: 1, name: "A", value: null },
						{ id: 2, name: "B", value: null },
						{ id: 3, name: "C", value: null }
					]
				},
				{ 
					cells: [
						{ id: 4, name: "D", value: null },
						{ id: 5, name: "E", value: null },
						{ id: 6, name: "F", value: null }
					]
				},
				{ 
					cells: [
						{ id: 7, name: "G", value: null },
						{ id: 8, name: "H", value: null },
						{ id: null, name: "I", value: null }
					]
				}
			];
			
			var values = [null, 1, 2, 3, 4, 5, 6, 7, 8];
			
			vm.rows.forEach(function(row) {
				
				row.cells.forEach(function (cell) {
					var index = Math.floor(Math.random() * values.length);
					cell.value = values[index];
					values.splice(index, 1);
				});
				
			});
			
		}
		
		function move(cell) {
			
			if (vm.win) return;
			
			var cellIndex = null;
			var rowIndex = null
			vm.rows.forEach(function(row, rIndex) {
				var cIndex = row.cells.indexOf(cell);
				if (cIndex >= 0) {
					cellIndex = cIndex;
					rowIndex = rIndex;
				}
			});
			
			if (canRight(cellIndex, rowIndex)) {
				moveRight(cellIndex, rowIndex);
			} else if (canLeft(cellIndex, rowIndex)) {
				moveLeft(cellIndex, rowIndex);
			} else if (canUp(cellIndex, rowIndex)) {
				moveUp(cellIndex, rowIndex);
			} else if (canDown(cellIndex, rowIndex)) {
				moveDown(cellIndex, rowIndex);
			}
			
			checkIfWin();
			
		}
		
		function checkIfWin() {
			
			var win = true;
			vm.rows.forEach(function(row) {
				
				row.cells.forEach(function (cell) {
					if (cell.value != cell.id) {
						win = false;
					}
				});
				
			});
			
			if (win) {
				vm.win = true;
				log("¡¡¡¡Ganaste!!!!");
			}
		}
		
		function canRight(cellIndex, rowIndex) {
			
			var row = vm.rows[rowIndex];
			if (row.cells.length > (cellIndex + 1)) {
				if (!row.cells[cellIndex + 1].value) {
					return true;
				}
			}
			
			return false;
		}
		
		function canLeft(cellIndex, rowIndex) {
			
			var row = vm.rows[rowIndex];
			if (cellIndex > 0) {
				if (!row.cells[cellIndex - 1].value) {
					return true;
				}
			}
			
			return false;
		}
		
		function canUp(cellIndex, rowIndex) {
			
			if (rowIndex > 0) {
				var row = vm.rows[rowIndex - 1];
				if (!row.cells[cellIndex].value) {
					return true;
				}
			}
			
			return false;
		}
		
		function canDown(cellIndex, rowIndex) {
			
			if (vm.rows.length > (rowIndex + 1)) {
				var row = vm.rows[rowIndex + 1];
				if (!row.cells[cellIndex].value) {
					return true;
				}
			}
			
			return false;
		}
		
		function moveRight(cellIndex, rowIndex) {
			log("Hacia la derecha");
			var row = vm.rows[rowIndex];
			var cell = row.cells[cellIndex];
			var right = row.cells[cellIndex + 1]; 
			right.value = cell.value;
			cell.value = null;
		}
		
		function moveLeft(cellIndex, rowIndex) {
			log("Hacia la izquierda");
			var row = vm.rows[rowIndex];
			var cell = row.cells[cellIndex];
			var left = row.cells[cellIndex - 1]; 
			left.value = cell.value;
			cell.value = null;
		}
		
		function moveUp(cellIndex, rowIndex) {
			log("Hacia arriba");
			var cell = vm.rows[rowIndex].cells[cellIndex];
			var up = vm.rows[rowIndex - 1].cells[cellIndex]; 
			up.value = cell.value;
			cell.value = null;
		}
		
		function moveDown(cellIndex, rowIndex) {
			log("Hacia abajo");
			var cell = vm.rows[rowIndex].cells[cellIndex];
			var down = vm.rows[rowIndex + 1].cells[cellIndex]; 
			down.value = cell.value;
			cell.value = null;
		}
		
		function log(message) {
			vm.log += message + "\r\n";
		}
	}
})();