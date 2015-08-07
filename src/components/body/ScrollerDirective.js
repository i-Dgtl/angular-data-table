import { requestAnimFrame } from '../../utils/utils';
import { scrollHelper } from './scrollHelper';

export function ScrollerDirective($timeout){
  return {
    restrict: 'E',
    require:'^dtBody',
    transclude: true,
    template: `<div ng-style="scrollerStyles()" ng-transclude></div>`,
    link: function($scope, $elm, $attrs, ctrl){
      var ticking = false,
          lastScrollY = 0,
          lastScrollX = 0,
          helper = scrollHelper.create($elm);

      function update(){
        $timeout(() => {
          ctrl.options.internal.offsetY = lastScrollY;
          ctrl.options.internal.offsetX = lastScrollX;
          ctrl.updatePage();
        });

        ticking = false;
      };

      function requestTick() {
        if(!ticking) {
          requestAnimFrame(update);
          ticking = true;
        }
      };

      $elm.parent().on('scroll', function(ev) {
        lastScrollY = this.scrollTop;
        lastScrollX = this.scrollLeft;
        requestTick();
      });

      $scope.scrollerStyles = function(scope){
        return {
          height: ctrl.count * ctrl.options.rowHeight + 'px'
        }
      };

    }
  };
};
