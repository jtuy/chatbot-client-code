import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('scrollMe', {static: false}) private myChatBox: ElementRef;
  title = 'Chatbot';
  messageArray = [];
  synth:any;
  voices:any;
  constructor(private socketService:SocketService) {
    this.synth = window.speechSynthesis;
    this.voices = this.synth.getVoices();
  }
  message= '';

  ngOnInit(){
    this.socketService.receivedReply().subscribe(data=> {
      this.messageArray.push({name:'Chatbot', message: data.outputMessage});
      this.speak(data.outputMessage);
    });
    let outputMessage = "Hi Cynthia, I'm your health care spending navigator. I can provide you with information about your claims. You can ask me like... \nShow my latest claims. \nShow my claims with provider FiveLakesHealthSystem. \nShow my claim details on 2020-12-18.";
    this.messageArray.push({name:'Chatbot', message: outputMessage});
    this.speak(outputMessage);
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }
  
  sendMessage(){
    const data = { patientId: "3516", message:this.message };
    this.socketService.sendMessage(data);
    this.messageArray.push({name:'Cynthia', message:this.message});
    this.message = '';
  }

  speak(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-US";
    u.volume = 1; //0-1 interval
    u.rate = 1;
    u.pitch = 1; //0-2 interval
    this.synth.speak(u);
  }

  scrollToBottom(): void {
    try {
        this.myChatBox.nativeElement.scrollTop = this.myChatBox.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}
