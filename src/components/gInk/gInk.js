angular.module('G.ink').directive('gInk', function(){
    return {
        restrict: 'E',
        scope: {},
        template: '<g-ink-blob ng-repeat="blob in $ctrl.blobs" ng-style="blob"></g-ink-blob>',
        controllerAs: '$ctrl',
        controller: function($scope, $element) {
            var $ctrl = this;
            $ctrl.blobs = [];
            
            $ctrl.$onInit = ngOnInit;
            $ctrl.$onDestroy = destroy;

            function ngOnInit() {
                var touchEvent = false;

                $element.on('touchstart mousedown', function(evt){
                    if (evt.type === 'touchstart') {
                        touchEvent = true;
                    } else if (evt.type === 'mousedown' && touchEvent) {
                        touchEvent = false;
                        return;
                    }

                    var x;
                    var y;

                    if (touchEvent) {
                        var rect = evt.target.getBoundingClientRect();
                        x = evt.touches[0].clientX - rect.left;
                        y = evt.touches[0].clientY - rect.top;
                    } else {
                        x = evt.offsetX;
                        y = evt.offsetY;
                    }

                    var blob = {
                        left: x + 'px',
                        top: y + 'px'
                    };


                    $ctrl.blobs.push(blob);
                    $scope.$evalAsync();

                    setTimeout(function(){
                        $ctrl.blobs.splice($ctrl.blobs.indexOf(blob), 1);
                    }, 2000);
                });
            }

            function destroy() {
                $element = null;
            }
        }
    };
});