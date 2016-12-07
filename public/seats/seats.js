'use strict';

angular
	.module('myApp.seats', ['ui.router'])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/seats/seats.html',
				controller: 'seatCtrl as sCtrl'

			});
	}])
	.controller('seatCtrl', seatCtrl);

seatCtrl.$inject = ["$http", "$rootScope","$localStorage","$scope"];
function seatCtrl($http, $rootScope,$localStorage,$scope){
	//var vm = this;
	//vm.locals= $localStorage.locals;
	$scope.localName = $localStorage.localName ;
	$scope.localSeatNumbers = $localStorage.localSeatNumbers ;
	$scope.$watchGroup(['localName','localSeatNumbers'], function(newval,oldval){
		if (newval != undefined){
			$localStorage.localName = newval[0];
			$localStorage.localSeatNumbers = newval[1];
			//console.log($localStorage);
		}
	});
	$scope.rows = ['A','B','C','D','E','F','G','H','I','J'];
	$scope.cols = [1,2,3,4,5,6,7,8,9,10,11,12];

	$localStorage.seats = {};
	angular.forEach($scope.rows ,function(row){
		$localStorage.seats[row]= {}

		angular.forEach($scope.cols ,function(col){
			$localStorage.seats[row][col]= {
				bookedBy: "",
				seatId : "",
				confirmed : false,
				selected : false
			};
		});
	});
	$scope.seats = $localStorage.seats;
	$scope.seatChoosed = [];

	$scope.selection= function(pidx,idx,val,Seatselect){
 		if($scope.detailSubmitted){
			if(Seatselect == true){

				if(($scope.seatChoosed.length + 1) > $scope.localSeatNumbers){
					val.selected = false;
					alert("Can't add more...");
				}

				else{
					val.selected = true;
					val.seatId = pidx + idx ;
					$scope.seatChoosed.push(val.seatId );
				}
				console.log(val);
			}
			else{
				val.selected = false;
				var id = pidx+idx;
				var removeIdx = $scope.seatChoosed.indexOf(id);
				$scope.seatChoosed.splice(removeIdx,1);
			}
		}
		else{
			alert("First submit the form..")
		}
	};

	$scope.confirmedSeats = {};
	$scope.$watch('localName',function(newval,oldval){
		if (newval != undefined){
			$scope.new ={};
			$scope.new.bookedBy = newval;
			$scope.new.bookedBy = newval;

		}
	});
	$scope.seatArr = [];
	$scope.confirmation= function(){
		if($scope.seatChoosed.length == $scope.localSeatNumbers){
			angular.forEach($scope.seats,function(row){
				angular.forEach(row,function(col){
					if(col.selected == true){
						col.confirmed = true;
						col.selected = false;
						col.bookedBy = $scope.localName;
						$scope.seatArr.push(col.seatId);
						$scope.confirmedSeats[ $scope.localName] = {};
						$scope.confirmedSeats[ $scope.localName].seats =$scope.seatArr ;
						$localStorage.confirmedSeats = $scope.confirmedSeats;
						console.log($scope.seats);
					}
				})
			});
			$scope.seatArr = [];
			$scope.localName = "";
			$scope.localSeatNumbers = "";
			$scope.seatChoosed = [];
		}
		else{
			alert("Please select same  no. of seats as you resistered..")
		}

	};
}