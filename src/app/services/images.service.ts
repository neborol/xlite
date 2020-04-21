import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  ngoSources = [
    {url: '../assets/images/cry.jpg', caption: 'Cry our beloved country Ambazonia!'},
    {url: '../assets/images/scro-group.jpg', caption: 'Cross-section of some SCRO members during one of the town hall meetings'},
    {url: '../assets/images/scro-town-hall.jpg', caption: 'SCRO Townhall Session in Toronto, Canada.'},
    {url: '../assets/images/country.jpg', caption: ''},
    {url: '../assets/images/map4.jpg', caption: 'The orange section was called The Cameroons(Northern & Southern)'},
    {url: '../assets/images/map2.jpg', caption: 'Map of Southern Cameroons, showing all the 13 counties.'},
    {url: '../assets/images/map3.jpg', caption: 'Map of Southern Cameroons, showing the important towns.'}
  ];

  protestSources = [
    {url: '../assets/protests/IMG-W90.jpg', caption: 'Ottawa protests, at the Cameroon embassy.'},
    {url: '../assets/protests/IMG-W91.jpg', caption: 'Ottawa protests, at the Cameroon embassy.'},
    {url: '../assets/protests/IMG-W92.jpg', caption: 'Simulating the burial of this wicked regime.'},
    {url: '../assets/protests/IMG-W93.jpg', caption: 'Our able Secretary General, taking it on.'},
    {url: '../assets/protests/IMG-W94.jpg', caption: 'Ottawa protests, at the Cameroon embassy.'},
    {url: '../assets/protests/IMG-W95.jpg', caption: 'Ottawa protests, with protection from Canadian Police.'},
    {url: '../assets/protests/IMG-W96.jpg', caption: 'Ottawa protests, at the Cameroon embassy.'},
    {url: '../assets/protests/IMG-W97.jpg', caption: 'Simulating the burial of this wicked regime.'},
    {url: '../assets/protests/IMG-W98.jpg', caption: 'Simulating the burial of this wicked regime.'},
    {url: '../assets/protests/IMG-W99.jpg', caption: 'Ottawa protests, despite snow and freezing temperatures.'},
    {url: '../assets/protests/IMG-W100.jpg', caption: 'Ottawa protests, despite snow and freezing temperatures.'},
    {url: '../assets/protests/IMG-W101.jpg', caption: 'SCRO attending a networking and fundraising event'},
    {url: '../assets/protests/IMG-W102.jpg', caption: 'SCRO in a Southern Cameroons awarness programme.'}
  ];

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


  leftSources = [
    {url: '../assets/brutality1.jpg',
        caption: '(1) Even women were brutalized for protesting peacefully, which is the constitutional right of everybody.'},
    {url: '../assets/brutality2.jpg', caption: '(2) We also treat and care for victims of military brutality.'},
    {url: '../assets/protest1.jpg',
        caption: '(3) Southern Cameroons Lawyers protesting against injustice by Cameroon Goverment.'},
    {url: '../assets/protest2.jpg',
        caption: '(4) Protesting Lawyers were molested by the Cameroon Police and Military.'},
    {url: '../assets/police-force.jpg',
       // tslint:disable-next-line:max-line-length
       caption: '(5) A Southern Cameroons Lawyer being rough-handled by the French Cameroon unprofessional and lawless Police, in total violation of the law.  This alone caused the people to rise up against this lawless government.'},
    {url: '../assets/university-students.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(6) Young University Students rose up in peaceful protest against the lawlessness and injustice, and were all picked up and put in jails till today.'},
    {url: '../assets/southern-cameroons.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(7) The people could not tolerate the lawlessness, and rose up in peaceful protest indicated by the green plants, but the lawless military shot down dozens of them.'},
    {url: '../assets/mancho3.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(8) The young man in Yellow, by name Mancho Bibixy, lead a protest against the poor situation of roads in the locality, but was arrested and detained.'}
  ];

  rightSources = [
    {url: '../assets/mancho2.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(9) Mancho Bibixy seen here being taken to the French Cameroon military tribunal (which according to the law, is not meant for civilians) for condemning the poor state of roads.'},
    {url: '../assets/reserve4.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(10) Women lead by a Political Opposition leader Kah Walla, rose up in a peaceful protest, each holding a broom as a sign of peace.'},
    {url: '../assets/reserve3.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(11) The Opposition leader Kah Walla, seen here in a peaceful protest, but some of them were arrested by the lawless French Cameroon police.'},
    {url: '../assets/reserve2.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(12) Due to the rise of armed conflicts against the lawless French Cameroon Government, the citizens started leaving to safer destinations.'},
    {url: '../assets/reserve1.jpg',
        caption: '(13) Many citizens of Southern Cameroons had no where safe to hide, and were living in the open bushes, how sad?'},
    {url: '../assets/refugees1.jpg',
        caption: '(14) Many of the people escaped through the bushes to Nigeria, and became refugees.'},
    {url: '../assets/burning.jpg',
        caption: '(15) Lawless French Cameroon military caught on camera burning down buildings and civilian homes.'},
    {url: '../assets/independence.jpg',
        // tslint:disable-next-line:max-line-length
        caption: '(16) No people in this world can live in a Federation with another group of people who support barbarism, corruption and lawlessness, so all that Southern Cameroons now wants, is full independence'},

  ];

  constructor() { }

  setAnimation(sourceArray, destinationArray) {
    for (let i = 0; i < sourceArray.length; i++) {
      const url = sourceArray[i].url;
      const caption = sourceArray[i].caption;
      destinationArray[i] = {
        url,
        show: false,
        caption
      };
    }
  }

}
