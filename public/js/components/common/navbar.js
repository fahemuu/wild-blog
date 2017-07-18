import moment from 'moment'
let navbar = {
    templateUrl: 'js/components/common/navbar.html',
    controller: ['UsersService', '$state', '$interval', function (UsersService, $interval, $state)
    {
        'use strict'
        angular.extend(this, {
            $onInit()
            {
                UsersService.getCurrent().then((user) =>
                {
                    this.user = user
                }).catch((err) =>
                {

                })
            },
            disconnect()
            {
                UsersService.disconnect().then(() =>
                {
                    Materialize.toast('Disconnected', 4000, 'toast-warning')
                    this.user = null
                    $state.reload()
                })
            }

        })

        let dateChange= () =>
        {
            this.date = moment().format('MMMM Do YYYY, h:mm:ss a')

        }
        dateChange();
        // $interval(dateChange,1000)
        setInterval(dateChange, 1000);

    }]
}

export default navbar
