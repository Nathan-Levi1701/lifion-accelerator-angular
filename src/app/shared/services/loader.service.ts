import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { OverlayLoaderComponent } from '~/components/loaders/overlay-loader/overlay-loader.component';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  public overlayRef!: OverlayRef

  constructor(private injector: Injector, private overlay: Overlay) {
  }

  public open(): void {
    this.overlayRef = this.createOverlay();
    this.attachDialogContainer(this.overlayRef);
  }

  public close(): void {
    this.overlayRef.dispose();
  }

  private createOverlay(): OverlayRef {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(overlayRef: OverlayRef): OverlayLoaderComponent {
    const injector = this.createInjector(overlayRef);
    const containerPortal = new ComponentPortal(OverlayLoaderComponent, null, injector);
    const containerRef: ComponentRef<OverlayLoaderComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(dialogRef: OverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(dialogRef, dialogRef);

    return new PortalInjector(this.injector, injectionTokens);
  }
}