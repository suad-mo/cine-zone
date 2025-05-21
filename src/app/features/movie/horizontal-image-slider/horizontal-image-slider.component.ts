import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { Carousel } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-horizontal-image-slider',
  imports: [CommonModule, ImageModule],
  templateUrl: './horizontal-image-slider.component.html',
  styleUrl: './horizontal-image-slider.component.scss',
})
export class HorizontalImageSliderComponent {
  images: Image[] = [
    {
      src: 'https://s3proxygw.cineplexx.at/pimcore-bosnia-prod/assets/_default_upload_bucket/LNS-TP-00088845_500px.jpg',
      alt: 'Image 1',
    },
    {
      src: 'https://s3proxygw.cineplexx.at/pimcore-bosnia-prod/assets/_default_upload_bucket/luv1620.comp.MarketingFrame.v01.1086_B_500px.jpeg',
      alt: 'Image 2',
    },
    {
      src: 'https://s3proxygw.cineplexx.at/pimcore-bosnia-prod/assets/_default_upload_bucket/LNS-TP-00087883_500px.jpg',
      alt: 'Image 3',
    },
    {
      src: 'https://s3proxygw.cineplexx.at/pimcore-bosnia-prod/assets/_default_upload_bucket/rev-1-MCR-T3-0002_High_Res_JPEG_500px.jpeg',
      alt: 'Image 4',
    }
  ];
}

interface Image {
  src: string;
  alt: string;
}
