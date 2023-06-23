import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MyapiService } from '../services/myapi.service';
import { Router } from '@angular/router';

interface Category {
  id: number;
  category_name: string;
  selected: boolean;

}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {
  @ViewChild('buttonRef') buttonRef!: ElementRef<HTMLButtonElement>;

  category: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:10,
  };

  Allvideos: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:20,
    
  };

  shorts: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:20,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    
  };

  categories: Category[] = [];

  allCategoryVideos:any[]=[];
  
 

  constructor(private _myapi: MyapiService,private router: Router) {
    this._myapi.getCategoryNames().subscribe((res: Category[]) => {
      const otherCategories = res.map(category => ({ id: category.id, category_name: category.category_name, selected: false }));
      this.categories = [
        { id: 101, category_name: 'All', selected: true }, // Modify the id and category_name as per your requirements
        ...otherCategories
      ];

  
      console.log(this.categories);
    });



    this._myapi.getAllCategoryVideos().subscribe((res)=>{
      this.allCategoryVideos=res;
      console.log(this.allCategoryVideos);
    })
  }


  ngAfterViewInit() {
    const categories = document.querySelectorAll('.owl-carousel .owl-item');
    categories.forEach((slide: Element) => {
      const slideElement = slide as HTMLElement;
      const button = slideElement.querySelector('button');
      if (button) {
        const buttonWidth = button.offsetWidth;
        slideElement.style.width = `${buttonWidth}px`;
      }
    });
  }
  

  
  changeButtonColor(id: number) {
    this.categories.forEach(slide => {
      slide.selected = slide.id === id;
    });
  }

  navigateToWatch(videoUrl: string): void {
    this.router.navigate(['/watch'], { queryParams: { v: videoUrl } });
  }

  // ngOnInit(){
  //   this._myapi.getCategoryNames().subscribe((res: Category[]) => {
  //     // Assign the web API response to the other categories
  //     const otherCategories = res.map(category => ({ id: category.id, category_name: category.category_name, selected: false }));
  
  //     // Add the "All" category manually as the first category
  //     this.categories = [
  //       { id: 101, category_name: 'All', selected: true }, // Modify the id and category_name as per your requirements
  //       ...otherCategories
  //     ];
  
  //     console.log(this.categories);
  //   });

  // }
  
  
  
  
  
}
