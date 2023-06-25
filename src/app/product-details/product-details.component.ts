import { Component, OnInit } from '@angular/core';
import { MockProductDetailed } from '../home-page/shared/mockProduct.model';
import { MockProductsService } from '../home-page/shared/mock-products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit{
  product: MockProductDetailed = {} as MockProductDetailed;
  images: {url: string}[] = [];
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
  reviewsValue: number = 5;
  addReviewValue: number = 0;

  constructor(private productService: MockProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.productService.getProduct(id).subscribe(product => {
      this.product = {
          id: product.id,
          name: product.title,
          photos: product.images,
          price: product.price,
          rating: product.rating,
          reviews: ['No reviews available'],
          discount: product.discount,
          category: product.category,
          description: product.description,
          stock: product.stock
        }
        this.getImages();
      });
    
  }

  scrollToSection(id: string) {
    const section = document.getElementById(id)!;
    section.scrollIntoView({ behavior: "smooth" });
  }

  getImages() {
    for (let photo of this.product.photos) {
      this.images.push({'url': photo});
    }    
    this.images = [...this.images];
  }
}