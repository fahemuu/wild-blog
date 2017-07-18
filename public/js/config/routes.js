/*
Create Angular config in app.config module
*/
export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) =>
{
    'use strict'
    // Define prefix
    $locationProvider.hashPrefix('!');
    // For each url not found redirection to '/'
    $urlRouterProvider.otherwise('/posts/');
    /*
      Define a state with name 'app' this state is abstract and url is empty (root of application)
      template is ui-view it's used to display nested views
    */
    $stateProvider
        .state('app', {
            url: '',
            abstract: true,
            template: '<navbar /><div class="container"><ui-view></ui-view></div>'
        })
        .state('callback', {
            url: '/auth/callback/:token',
            template: '',
            controller: ['UsersService', '$stateParams', '$state', function (UsersService, $stateParams, $state)
            {
                if ($stateParams.token)
                {
                    UsersService.setToken($stateParams.token).then((user) =>
                    {
                        let toastContent = `Welcome ${ user.name } !`
                        Materialize.toast(toastContent, 4000, 'toast-success')
                        $state.go('blog.list')
                    })
                } else
                {
                    $state.go('blog.list')
                }
            }]
        })
        .state('algo1',
        {
            url: '/algo1',
            template: '<h6> Parmi les noms :   {{arr1.join()}} et {{arr2.join()}} et {{arr3.join()}} </h6><h1>seulement </h1> , <h3>{{str1}}  {{str2}}  {{str3}} </h3><h2>Qui sont mes amis</h2>',
            controller: ['$scope',
                function ($scope)
                {
                    $scope.str1 = ""
                    $scope.str2 = ""
                    $scope.str3 = ""
                    $scope.arr1 = ["Ryan", "Kieran", "Mark"]
                    $scope.arr2 = ["Ryan", "Jimmy", "123", "4", "Cool Man"]
                    $scope.arr3 = ["Jimm", "Cari", "aret", "truehdnviegkwgvke", "sixtyiscooooool"]
                    $scope.friend = function (arr)
                    {
                        let len1 = this.arr1.length,
                            len2 = this.arr2.length,
                            len3 = this.arr3.length;

                        for (let i = 0; i < len1; i++)
                        {

                            if (this.arr1[i].length === 4)
                                $scope.str1 += this.arr1[i]
                        }
                        for (let i = 0; i < len2; i++)
                        {
                            if (this.arr2[i].length === 4)
                                $scope.str2 += this.arr2[i]
                        }

                        for (let i = 0; i < len3; i++)
                        {
                            if (this.arr3[i].length === 4)
                                $scope.str3 += " " + this.arr3[i]
                        }


                    }

                    $scope.friend()
                }
            ]
        }
        )
}]
