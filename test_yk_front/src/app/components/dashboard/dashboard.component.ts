import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title !: string;

  constructor(private apiService: ApiService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    
    this.router.queryParamMap.subscribe(params => {
      
      const titleString = params.get('title');
      this.title = titleString ? titleString : "";
      
    });
  }

  logout() {
    this.apiService.logout();
    // this.router.navigate(['/login']);
  }
}
