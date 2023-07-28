import { Component, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  CollectionReference,
  DocumentReference,
} from '@angular/fire/firestore';
declare var Typed: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  LETTERS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private firestore: Firestore = inject(Firestore);
  usersCollection: CollectionReference = collection(this.firestore, 'messages');

  ngOnInit() {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });
    const hiddenElemnts = document.querySelectorAll<HTMLElement>('.hidden');
    const bluredElemnts = document.querySelectorAll<HTMLElement>('.blured');
    hiddenElemnts.forEach((el) => {
      intersectionObserver.observe(el);
    });
    bluredElemnts.forEach((el) => {
      intersectionObserver.observe(el);
    });
    let type = new Typed('.auto-type', {
      strings: ['CREATED', 'CHRIST', 'COMMISSIONED'],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
    });
    this.blobfolllow();
    /*==================== toggle icon navbar ====================*/
    let menuIcon = document.querySelector<HTMLElement>('#menu-icon');
    let navbar = document.querySelector<HTMLElement>('.navbar');

    menuIcon!.onclick = () => {
      menuIcon!.classList.toggle('bx-x');
      navbar!.classList.toggle('active');
    };

    /*==================== scroll sections active link ====================*/
    let sections = document.querySelectorAll<HTMLElement>('section');
    let navLinks = document.querySelectorAll<HTMLElement>('header nav a');

    window.onscroll = () => {
      sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          navLinks.forEach((links) => {
            links.classList.remove('active');
            document
              .querySelector<HTMLElement>('header nav a[href*=' + id + ']')!
              .classList.add('active');
          });
        }
      });
      /*==================== sticky navbar ====================*/
      let header = document.querySelector<HTMLElement>('header');

      header!.classList.toggle('sticky', window.scrollY > 100);

      /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
      menuIcon!.classList.remove('bx-x');
      navbar!.classList.remove('active');

      //this.comment();
    };
  }

  comment() {
    document.querySelectorAll<HTMLElement>('.transforming').forEach((el) => {
      el.onmouseover = (event) => {
        let iterations = 0;
        const interval = setInterval(() => {
          let target: HTMLElement = event.target as HTMLElement;
          target.innerText = target.innerText
            .split('')
            .map((letters, index) => {
              if (index < iterations) {
                return target.dataset['value']![index];
              }
              return this.LETTERS[Math.floor(Math.random() * 26)];
            })
            .join('');

          if (iterations >= target.dataset['value']!.length)
            clearInterval(interval);
          iterations += 1 / 3;
        }, 30);
      };
    });
  }
  blobfolllow() {
    const blob = document.getElementById('blob') as HTMLElement;
    document.body.onpointermove = (event) => {
      const { clientX, clientY } = event;
      blob.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: 'forwards' }
      );
    };
  }
  aboutP2() {
    const ap2 = document.getElementById('aboutP2');
    ap2!.classList.toggle('none');
    document.getElementById('ap2but')!.innerText = ap2!.classList.contains(
      'none'
    )
      ? 'Read More'
      : 'Read Less';
  }

  commingSoon() {
    window.alert('Comming Soon!!');
  }

  contactUs() {
    const btn = document.querySelector<HTMLButtonElement>('#sbtn');
    btn!.disabled = true;
    const name = document.querySelector<HTMLInputElement>('#name')!.value;
    const email = document.querySelector<HTMLInputElement>('#email')!.value;
    const number = document.querySelector<HTMLInputElement>('#number')!.value;
    const subject = document.querySelector<HTMLInputElement>('#subject')!.value;
    const message = document.querySelector<HTMLInputElement>('#message')!.value;
    if (
      name === '' ||
      email === '' ||
      number === '' ||
      subject === '' ||
      message === ''
    ) {
      window.alert('Please Fill All Fields');
      btn!.disabled = false;
    } else
      addDoc(this.usersCollection, {
        name,
        email,
        number,
        subject,
        message,
      }).then((documentReference: DocumentReference) => {
        btn!.disabled = false;
      });
  }
}
