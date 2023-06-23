import { Component, OnInit } from '@angular/core';
import { PhotoService } from './shared/photo.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  products: [] = [];
  images: any[] = [];
  position: string = 'bottom';
  positionOptions = [
    {
        label: 'Bottom',
        value: 'bottom'
    },
    {
        label: 'Top',
        value: 'top'
    },
    {
        label: 'Left',
        value: 'left'
    },
    {
        label: 'Right',
        value: 'right'
    }
  ];
  responsiveOptions: any[] = [
      {
        breakpoint: '3000px',
        numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '650px',
          numVisible: 3
      }
  ];
  reviewsValue: number = 4;
  addReviewValue: number = 0;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getImages().then((images) => (this.images = images));
  }

  log() {
    console.log(this.addReviewValue);
    
  }
}
