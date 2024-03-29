import {AfterViewInit, Directive, ElementRef, ViewContainerRef} from '@angular/core';
import { Input } from '@angular/core';

interface ngAfterViewInit {
}

@Directive({
  selector: '[menu]'
})
export class MenuDirective implements ngAfterViewInit {
  viewRef;
  @Input ('menu') menu;

  constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) { }




  ngAfterViewInit() {

    this.menu.closeChange.subscribe(() => {
      this.close();
    });

    this.close();
    this.elementRef.nativeElement.addEventListener('click', event => {
      let pos = this.elementRef.nativeElement;
      pos = pos.getBoundingClientRect();

      const position = {
        'x': pos.left,
        'y': pos.top,
      }
      this.render(position);
    });

    document.addEventListener('mouseup', (e) => {
      if (this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });
    document.addEventListener('resize', (e) => {
      if (this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });
    document.addEventListener('scroll', (e) => {
      if (this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });
    document.addEventListener('touchend', (e) => {
      if (this.elementRef.nativeElement !== e.target) {
        this.close();
      }
    });

  }

  render(coordinate) {
    this.viewRef = this.viewContainerRef.createEmbeddedView(this.menu.templateRef);
    this.viewRef.detectChanges();

    this.viewRef.rootNodes.forEach(rootNode => {
      rootNode.style = 'position: absolute; top:' + (coordinate.y + 35) + 'px;' + 'left:' + (coordinate.x - 140) + 'px;';
      rootNode.classList = 'open';
      document.body.appendChild(rootNode);

      if (rootNode.clientWidth) {
      }
    });
  }

  close() {
    if(this.viewContainerRef.length) {
      const viewRef = this.viewRef;

      viewRef.rootNodes.forEach(rootNode => {
        if (rootNode.classList) {
          // rootNode.classList.remove('open');
        }
      });

      setTimeout(() => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef)), 50);
    }
  }


}
