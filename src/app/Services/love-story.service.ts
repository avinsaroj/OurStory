import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceResponce } from '../Models/service-responce';
import { CommanModelForPost } from '../Models/comman-model-for-post';
import { PostModel } from '../Models/post-model';
import { SingleServiceResponce } from '../Models/single-service-responce';
import { LikeDislikeModel } from '../Models/like-dislike-model';
import { AboutUsRequest } from '../Models/about-us-requerst';
import { OurStoryModel } from '../Models/our-story-model';
import { GalleryModel } from '../Models/gallery-model';
import { OurFamilyModel } from '../Models/our-family-model';
import { LogoModel } from '../Models/logo-model';
import { NavBarModel } from '../Models/nav-bar-model';

@Injectable({
  providedIn: 'root'
})
export class LoveStoryService {
  //https://localhost:7289/
  //https://192.168.1.33/
  APiUrl: string = 'https://192.168.1.35/api/LoveStory/';
  constructor(private HttpClient: HttpClient, private router: Router) { }
  GetAllPost():Observable<ServiceResponce<PostModel>>{
    return this.HttpClient.get<ServiceResponce<PostModel>>(this.APiUrl+"GetAllPost");  
  }
  GetAllPostByUserId(userid:string):Observable<ServiceResponce<PostModel>>{
    return this.HttpClient.get<ServiceResponce<PostModel>>(this.APiUrl+`GetPostByUserId/${userid}`);
  }
  InsertPost(Post:PostModel):Observable<SingleServiceResponce<string>>{
   return this.HttpClient.post<SingleServiceResponce<string>>(this.APiUrl+"InsertPost",Post);

  }
  GetPostId(id:any):Observable<CommanModelForPost>{
  return this.HttpClient.get<CommanModelForPost>(this.APiUrl+`GetPostById/${id}`)
  }
  InsertComment(Comment:any):Observable<SingleServiceResponce<number>>{
    return this.HttpClient.post<SingleServiceResponce<number>>(this.APiUrl+"InsertCommnets",Comment)
  }
  InsertLikeDislike(model:LikeDislikeModel):Observable<SingleServiceResponce<number>>{
    return this.HttpClient.post<SingleServiceResponce<number>>(this.APiUrl+"InsertLikeDisLike",model)
  }
  getAboutU(userid:string):Observable<SingleServiceResponce<AboutUsRequest>>{
    return this.HttpClient.get<SingleServiceResponce<AboutUsRequest>>(this.APiUrl+`GetABoutU/${userid}`)
  }
  getAboutUF(userid:string):Observable<SingleServiceResponce<AboutUsRequest>>{
    return this.HttpClient.get<SingleServiceResponce<AboutUsRequest>>(this.APiUrl+`GetABoutUF/${userid}`)
  }
  GetOurStory(userid:string):Observable<ServiceResponce<OurStoryModel>>{
    return this.HttpClient.get<ServiceResponce<OurStoryModel>>(this.APiUrl+`GetOurStory/${userid}`)
  }
  GetGallery(userid:string):Observable<ServiceResponce<GalleryModel>>{
    return this.HttpClient.get<ServiceResponce<GalleryModel>>(this.APiUrl+`GetGallery/${userid}`)
  }
  GetOurFamily(userid:string):Observable<ServiceResponce<OurFamilyModel>>{
    return this.HttpClient.get<ServiceResponce<OurFamilyModel>>(this.APiUrl+`GetOurFamily/${userid}`)
  }
  GetLogo(userid:string):Observable<SingleServiceResponce<LogoModel>>{
    return this.HttpClient.get<SingleServiceResponce<LogoModel>>(this.APiUrl+`GetLogo/${userid}`)
  }
  GetNavBar(userid:string):Observable<ServiceResponce<NavBarModel>>{
    return this.HttpClient.get<ServiceResponce<NavBarModel>>(this.APiUrl+`GetNavBar/${userid}`)
  }
  InsertFamily(model:OurFamilyModel):Observable<SingleServiceResponce<number>>{
    return this.HttpClient.post<SingleServiceResponce<number>>(this.APiUrl+"InsertOurFamily",model)
  }
  InsertOurStory(model:OurStoryModel):Observable<SingleServiceResponce<number>>{
    return this.HttpClient.post<SingleServiceResponce<number>>(this.APiUrl+"InsertOurStory",model)
  }
}


