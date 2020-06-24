import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  baseUrl = environment.apiUrl;

  protestSourcesJan052019 = [
    {url: '../assets/protests/Jan052019/img-1.jpg',
    caption: 'Toronto Protests on Sesekou Ayuk Tabe Day Jan-05-2019.'},
    {url: '../assets/protests/Jan052019/img-2.jpg',
    caption: 'Everybody standing up for Justice in Southern Cameroons and against Genocide.'},
    {url: '../assets/protests/Jan052019/img-3.jpg', caption: 'France and the UN show biased respect for human rights.'},
    {url: '../assets/protests/Jan052019/img-4.jpg', caption: 'SCRO members stand for the good guys with the gun.'},
    {url: '../assets/protests/Jan052019/img-5.jpg',
    caption: 'The Cameroon military and Cameroon dictators need some training on how to be human.'},
    {url: '../assets/protests/Jan052019/img-6.jpg', caption: 'The United Nations and the ICJ should be serious and do their job.'},
    {url: '../assets/protests/Jan052019/img-7.jpg',
    caption: 'Liberate all the citizens being tried at your military tribunals for misdemeanors.'},
    {url: '../assets/protests/Jan052019/img-8.jpg',
    caption: 'Help us educate Paul Biya and French Cameroon that there can be no peace without justice.'},
    {url: '../assets/protests/Jan052019/img-9.jpg',
    caption: 'Let Toronto and Canada know that staying silent means taking sides with the oppressor.'},
    {url: '../assets/protests/Jan052019/img-10.jpg', caption: 'Together, we can stop another genocide in the 21st century.'},
    {url: '../assets/protests/Jan052019/img-11.jpg', caption: 'Together, we can stop injustice and instability around the world.'},
    {url: '../assets/protests/Jan052019/img-12.jpg',
    caption: 'The international community has refused to stop genocide in Southern Cameroons.'},
    {url: '../assets/protests/Jan052019/img-13.jpg',
    caption: 'Southern Cameroonians are proud of their Nation, their flag and their values as a people.'},
    {url: '../assets/protests/Jan052019/img-14.jpg',
    caption: 'Together with all the good people of the world, Paul Biya, France, and French Cameroon can be stopped.'},
    {url: '../assets/protests/Jan052019/img-15.jpg',
    caption: 'What the United Nations and France allow in Southern Cameroons, they can not tolerate elsewhere.'},
    {url: '../assets/protests/Jan052019/img-16.jpg', caption: 'Stop killing innocent people in Southern Cameroons.'},
    {url: '../assets/protests/Jan052019/img-17.jpg',
    caption: 'Canada has always shown kindness to other oppressed people, we want Canada to do the same for Southern Cameroons.'},
    {url: '../assets/protests/Jan052019/img-18.jpg',
    caption: 'Burning down of villages and homes is violation of human rights. How could Paul Biya not know this?'},
    {url: '../assets/protests/Jan052019/img-19.jpg',
    caption: 'Southern Cameroonians are peaceful people and have done nobody wrong to deserve such injustice.'},
    {url: '../assets/protests/Jan052019/img-20.jpg', caption: 'SCRO stands for human rights and Justice for all.'},
    {url: '../assets/protests/Jan052019/img-21.jpg',
    caption: 'Release Sesekou Ayuk Julius, Tassang Wilfrend and Co, because they did nothing wrong and Kidnaping them is a crime.'},
    {url: '../assets/protests/Jan052019/img-22.jpg',
    caption: 'Southern Cameroons has all it takes to govern themselves, and had proven to be better than French Cameroon.'},
    {url: '../assets/protests/Jan052019/img-23.jpg',
    caption: 'Thank you all for coming out to say No to dictatorship, injustice and human rights violation by French Cameroon.'},
    {url: '../assets/protests/Jan052019/img-24.jpg',
    caption: 'Thank you all for coming out to say No to state terrorism by France and French Cameroon'},
    {url: '../assets/protests/Jan052019/img-25.jpg',
    caption: 'Thank you all for coming out to honour the Southern Cameroons flag and values.'},
    {url: '../assets/protests/Jan052019/img-26.jpg',
    caption: 'Thank you all for coming out and making your voices heard loud and clear.'},
    {url: '../assets/protests/Jan052019/img-27.jpg',
    caption: 'Thank you very much Toronto and Canada for giving us a place we can call home, what Paul Biya deprived us of.'},
    {url: '../assets/protests/Jan052019/img-28.jpg',
    caption: 'Thank you very much Mr. SCRO SG for all the mobilizations and all the good work.'},
    {url: '../assets/protests/Jan052019/img-29.jpg',
    caption: 'We want peace, justice, progress and respect for human rights in Southern Cameroons, just like in Canada.'},
    {url: '../assets/protests/Jan052019/img-30.jpg',
    caption: 'Supporting the people of Southern Cameroons in saying No to the burning down of villages, is the right thing to do.'}
  ];

  constructor(private http: HttpClient) { }

  // setAnimation(sourceArray, destinationArray) {
  //   for (let i = 0; i < sourceArray.length; i++) {
  //     const url = sourceArray[i].url;
  //     const caption = sourceArray[i].caption;
  //     destinationArray[i] = {
  //       url,
  //       show: false,
  //       caption
  //     };
  //   }
  // }

  setAnimation(sourceArray, destinationArray) {
    for (let i = 0; i < sourceArray.length; i++) {
      const url = sourceArray[i].uniquePhotoName;
      const caption = sourceArray[i].imageCaption;
      destinationArray[i] = {
        url,
        show: false,
        caption
      };
    }
  }

  postMissionImages(imgObj) {
    return this.http.post(this.baseUrl + 'Image/uploadMulti', imgObj, { reportProgress: true, observe: 'events' });
  }

  getMissionImages() {
    return this.http.get(this.baseUrl + 'Image/getAllImages');
  }

}
