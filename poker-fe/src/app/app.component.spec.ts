import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TestBed, ComponentFixtureAutoDetect, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { PlayerGenComponent } from './subcomponents/player-gen/player-gen.component';



fdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        //AppRoutingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        PlayerGenComponent
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create a game which "Create Game" is clicked', async () => {
    const fixture = TestBed.createComponent(AppComponent);

    const debugElement = fixture.debugElement;

    const createButton = debugElement.queryAll(By.css('button'))[0];


    // const createGameButton = nativeElement.querySelector('button');
    expect(createButton.nativeElement.textContent).toContain('Create Game');


    createButton.triggerEventHandler('click', null);




    for (let i = 0; i < 5000; i++) {
      if (fixture.componentInstance.gameId) {
        break;
      }
      await sleep(1);
    }
    const gameContainer = debugElement.query(By.css('.game-state-container')); //nativeElement.querySelector('.game-state-container');
    console.log('container', gameContainer);
    console.log('done loop')
    expect(gameContainer.nativeElement.textContent).toContain('Players');

    const addButton = debugElement.queryAll(By.css('button'))[2];
    expect(addButton.nativeElement.textContent).toContain('Add Player');

    addButton.triggerEventHandler('click', null);
    addButton.triggerEventHandler('click', null);
    addButton.triggerEventHandler('click', null);
    addButton.triggerEventHandler('click', null);

    for (let i = 0; i < 20; i++) {
      await sleep(100);
      console.log(fixture.componentInstance.blankPlayerIter);
      // if (fixture.componentInstance.blankPlayerIter.length === 4) {
      //   break;
      // }
    }
    const players = debugElement.queryAll(By.css('.player-gen-container')); //nativeElement.querySelector('.game-state-container');
    console.log('players', fixture.componentInstance.blankPlayerIter);
    console.log('players query', players);

  });

  // it(`should have as title 'poker-fe'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('poker-fe');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('poker-fe app is running!');
  // });
});

const sleep = (sleepMs) => {
  return new Promise(resolve => {
    setTimeout(resolve, sleepMs);
  })
}

