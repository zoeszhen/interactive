var app = angular.module('food-store', []);

app.controller('SliderController', function($scope, $http) {
    var pictures = [];
    var req = {
                method: 'GET',
                url: '/files',
            }
            $http(req).success(function(data){
               pictures = data.toString().split(",");
               for (i = 0; i < pictures.length; i++)
                {
                    var pieces = pictures[i].split("/")
                    pictures[i] = pieces[pieces.length-1];
                }
            });
    index = 0;
    $scope.submit = function() {
        document.getElementById("picture-frame").classList.remove("hide");
        document.getElementById("slogan").className += " hide";
        document.getElementById("try-btn").className += " hide";
        document.getElementById("submit").value = "Next"
        $scope.imageurl = '/food-images/' + pictures[index];
        console.log(index);
        console.log($scope.imageurl);
        if ( index > pictures.length - 1)
        {
            document.getElementById("slogan").classList.remove("hide");
            document.getElementById("main-heading").innerHTML = "Press &ldca; to see the results";
            document.getElementById("main-para").className += " hide";
            document.getElementById("picture-frame").className += " hide";
            document.getElementById("submit").className += " hide";
            $(document).keyup(function(e) {
                if (e.keyCode === 13) 
                {
                    console.log("hello in computeResult");
                    var req = {
                        method: 'GET',
                        url: '/computeResult',
                    }
                    $http(req).success(function(data){
                        var data = parseInt(data.toString());

                        if(data <= pictures.length)
                        {
                            document.getElementById("test_body").className += " hide";
                            console.log(data);
                            $('html, body').animate({ scrollTop: 0 }, 'fast');
                            document.getElementById("foot").classList.remove("hide");
                            document.getElementById("result-pic").src = "/food-images/"+pictures[data];
                            var food = pictures[data].split(".")[0];
                            document.getElementById("gp").src = "https://www.google.com/maps/embed/v1/search?q=" + food + ",&zoom=11&key=AIzaSyAWN7yD_HJi7GB7eQuvkA8pIyd5xR9QBPY";
                        }
                        else
                        {
                            document.getElementById("main-heading").innerHTML = "Error Occured! Please retry";
                        }

                    });
                }
            });
        }
        index = index + 1;
        return;
    };
});
