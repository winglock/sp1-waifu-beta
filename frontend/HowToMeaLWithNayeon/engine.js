class TextGame {
    constructor() {
        this._textBarController = new TextBarController(this.branchProcess);
        this._canvasController = new CanvasController();
        this._soundController = new SoundController();
        this._branchManager = new BranchManager();
        this._currentBranch = new Branch("Root", "END");
        this._currentPageIndex = 0;
        this._delaytimer = null;
        this._isBranching = false;
    }
    
    get textBarController() { return this._textBarController; }
    get canvasController() { return this._canvasController; }

    //branch: Branch
    addBranch(branch) {
        this._branchManager.addBranch(branch);
    }

    setTextBarElement(chatBox, nameBox) {
        this._textBarController.init(chatBox, nameBox);
    }

    setCanvasElement(canvasImg, leftImg, centerImg, rightImg) {
        this._canvasController.init(canvasImg, leftImg, centerImg, rightImg);
    }

    //entryBranch: Branch
    start(entryBranch) {
        this._currentBranch = entryBranch;
        
        // 게임 시작 시 초기 해시 설정
        this.initializeGameHash();
        
        this.nextPage();
    }
    
    // 게임 시작 시 초기 해시 설정
    initializeGameHash() {
        // 이미 해시가 있는지 확인
        if (!localStorage.getItem('currentPathHash')) {
            // 백엔드에서 초기 해시 가져오기
            fetch('/api/initial-hash')
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.initialHash) {
                        console.log('서버에서 초기 해시 수신:', data.initialHash);
                        // 초기 해시 설정
                        localStorage.setItem('currentPathHash', data.initialHash);
                        localStorage.setItem('choicePath', JSON.stringify([]));
                        console.log('게임 초기 해시가 설정되었습니다.');
                    } else {
                        console.error('초기 해시 수신 실패:', data.message);
                        // 서버에서 해시를 받지 못한 경우 기본값 설정
                        localStorage.setItem('currentPathHash', 'INITIAL_HASH');
                        localStorage.setItem('choicePath', JSON.stringify([]));
                    }
                })
                .catch(error => {
                    console.error('서버 연결 오류:', error);
                    // 서버 연결 실패 시에도 로컬에 초기 해시 설정
                    localStorage.setItem('currentPathHash', 'INITIAL_HASH');
                    localStorage.setItem('choicePath', JSON.stringify([]));
                });
        } else {
            console.log('기존 게임 해시 사용:', localStorage.getItem('currentPathHash'));
        }
    }

    nextPage() {
        if (this._currentBranch.pages.length <= this._currentPageIndex)
            return;

        if (this._isBranching === true)
            return;
            
        if (this._currentPageIndex != 0)

        if (this._delaytimer !== null) {
            if (this._currentPageIndex != 0) {
                if (this._currentBranch.pages[this._currentPageIndex - 1].baseEvents.find(b => {
                    return b.eventType === EventType.TextBar && b.textBarEventType === TextbarEventType.Branch
                }) != undefined)
                    return;
    
                if (this._currentBranch.pages[this._currentPageIndex - 1].baseEvents.find(b => {
                    return b.eventType === EventType.Canvas && b.canvasEventType === CanvasEventType.ChangeBackGround
                }) != undefined)
                    return;
    
                if (this._currentBranch.pages[this._currentPageIndex - 1].baseEvents.find(b => {
                    return b.eventType === EventType.Canvas && b.canvasEventType === CanvasEventType.RemoveObject
                }) != undefined)
                    return;
    
                if (this._currentBranch.pages[this._currentPageIndex - 1].baseEvents.find(b => {
                    return b.eventType === EventType.Sound
                }) != undefined)
                    return;
            }
            
            clearTimeout(this._delaytimer);
            this._delaytimer = null;
        }
        
        //currentPage: Page
        const currentPage = this._currentBranch.pages[this._currentPageIndex];
        //currentEvents: BaseEvent[]
        const currentEvents = currentPage.baseEvents;
        
        this.eventProcess(currentEvents);

        if (this._currentBranch.pages.length <= this._currentPageIndex + 1) {
            const jumpBranch = this._branchManager.getBranch(this._currentBranch.end);
            if (jumpBranch !== null) {
                this._currentBranch = jumpBranch;
                this._currentPageIndex = -1;
            }
        }
        this._currentPageIndex += 1;   
    }

    //baseEvent: BaseEvent[]
    eventProcess(baseEvent){
        //item: BaseEvent 
        for (let index = 0; index < baseEvent.length; index++) {
            const item = baseEvent[index];
            switch (item.eventType) {
                case EventType.TextBar:
                    this.textBarProcess(item);
                    break;

                case EventType.Canvas:
                    this.canvasProcess(item);
                    break;

                case EventType.Sound:
                    this.soundProcess(item);
                    break;

                case EventType.Delay:
                    this.delayProcess(item, baseEvent, index);
                    return;
            
                default:
                    break;
            }
        }
    }

    //textBarEvent: TextBarEvent
    textBarProcess(textBarEvent) {
        switch (textBarEvent.textBarEventType) {
            case TextbarEventType.Text:
                this._textBarController.setText(textBarEvent.eventData.name, textBarEvent.eventData.text);
                break;

            case TextbarEventType.Branch:
                this._isBranching = true;
                let selectedData = [];
                textBarEvent.eventData.forEach((item) => selectedData.push(item.name));
                this._textBarController.showBranch(textBarEvent.eventData, this);
                break;
        
            default:
                break;
        }
    }

    //canvasEvent: CanvasEvent
    canvasProcess(canvasEvent) {
        switch (canvasEvent.canvasEventType) {
            case CanvasEventType.AddImage:
                this._canvasController.imageShow(
                    canvasEvent._eventData.name, 
                    canvasEvent._eventData.src, 
                    canvasEvent._eventData.positon, 
                    canvasEvent._eventData.transition
                );
                break;

            case CanvasEventType.ChangeBackGround:
                this._canvasController.setBackground(
                    canvasEvent._eventData.src
                );
                break;

            case CanvasEventType.DrawText:
                this._canvasController.drawtext(
                    canvasEvent._eventData.text
                );
                break;
            
            case CanvasEventType.ShowEnding:
                this._canvasController.endScreen(
                    canvasEvent._eventData.text
                );
                break;
                
            case CanvasEventType.RemoveObject:
                this._canvasController.imageRemove(
                    canvasEvent._eventData.name, 
                    canvasEvent._eventData.transition
                );
                break;

            default:
                break;
        }
    }
    
    //soundEvent: SoundEvent
    soundProcess(soundEvent) {
        switch (soundEvent.soundEventType) {
            case SoundEventType.Background:
                if (soundEvent.stop === true)
                    this._soundController.stopBackground();
                else
                    this._soundController.playBackground(soundEvent.src);
                break;
                
            case SoundEventType.Sfx:
                this._soundController.playSound(soundEvent.src)
                break;
        
            default:
                break;
        }
    }
    
    //delayEvent: DelayEvent, baseEvents: BaseEvent[], index: Number
    delayProcess(delayEvent, baseEvents, index) {
        this._delaytimer = setTimeout(() => {
            for (let innerIndex = index + 1; innerIndex < baseEvents.length; innerIndex++) {
                const item = baseEvents[innerIndex];
                switch (item.eventType) {
                    case EventType.TextBar:
                        this.textBarProcess(item);
                        break;
    
                    case EventType.Canvas:
                        this.canvasProcess(item);
                        break;

                    case EventType.Sound:
                        this.soundProcess(item);
                        break;

                    case EventType.Delay:
                        this.delayProcess(item, baseEvents, innerIndex);
                        return;
                
                    default:
                        break;
                }
            }
            this._delaytimer = null;
        }, delayEvent.delay);
    }

    //branchPair: BranchPair
    branchProcess(branchPair, o) {
        const jumpBranch = o._branchManager.getBranch(branchPair.branch);
        if (jumpBranch == null) {
            o._canvasController.endScreen("END (Error)");
            o._isBranching = false;
            return;
        } else {
            o._currentBranch = jumpBranch;
            o._currentPageIndex = 0;
        }
        o._isBranching = false;
    }
}

//EventType: Number
const EventType = {
	TextBar: 0,
    Canvas: 1,
    Sound: 2,
    Delay: 3
}

//TextbarEventType: Number
const TextbarEventType = {
	Text: 0,
	Branch: 1
}

//CanvasEventType: Number
const CanvasEventType = {
	AddImage: 0,
    ChangeBackGround: 1,
    DrawText: 2,
    ShowEnding: 3,
    RemoveObject: 4
}

class Page {
    constructor() {
        //baseEvents: BaseEvent[]
        this._baseEvents = [];
    }

    //baseEvent: BaseEvent, return: Page
    addEvent(baseEvent) {
        this._baseEvents.push(baseEvent);
        return this;
    }
    
    //name: String, text: String, return: Page
    addTextEvent(name, text) {
        this.addEvent(TextBarEvent.text(name, text));
        return this;
    }

    //src: String, return: Branch
    addBackbroundEvent(src){
        this.addEvent(CanvasEvent.changeBackGround(src));
        return this;
    }

    //baseEvent: BaseEvent, return: Page
    removeEvent(baseEvent) {
        this._baseEvents.push(baseEvent);
        return this;
    }

    get baseEvents() { return this._baseEvents; }
}

class BaseEvent {
    //eventType: EventType
    constructor(eventType) {
        //eventType: EventType
        this._eventType = eventType;
    }

    //return: EventType
    get eventType() { return this._eventType; }
}

class TextBarEvent extends BaseEvent {
    //textBarEventType: TextBarEventType, eventData: any
    constructor(textBarEventType, eventData) {
        super(EventType.TextBar);
        //textBarEventType: TextBarEventType
        this._textBarEventType = textBarEventType;
        //eventData: any
        this._eventData = eventData;
    }

    //name: String, text: String, return: TextBarEvent
    static text(name, text) {
        return new TextBarEvent(TextbarEventType.Text, new TextPair(name, text));
    }

    //branchPairs: BranchPair[], return: TextBarEvent
    static branch(branchPairs) {
        return new TextBarEvent(TextbarEventType.Branch, branchPairs);
    }

    //return: TextbarEventType
    get textBarEventType() { return this._textBarEventType; }

    //return: any
    get eventData() { return this._eventData; }
}

class TextPair {
    //name: String, text: String
    constructor(name, text) {
        this._name = name;
        this._text = text;
    }   

    //return: String
    get name() { return this._name; }
    
    //return: String
    get text() { return this._text; }
}

class BranchPair {
    //name: String, branch: Branch
    constructor(name, branch) {
        this._name = name;
        this._branch = branch;
    }   

    //return: String
    get name() { return this._name; }
    
    //return: Branch
    get branch() { return this._branch; }
}

class CanvasEvent extends BaseEvent {
    //canvasEventType: CanvasEventType
    constructor(canvasEventType, eventData) {
        super(EventType.Canvas);
        this._canvasEventType = canvasEventType;
        this._eventData = eventData;
    }

    //return: CanvasEvent
    static addImage(name, src, position, transition) { 
        return new CanvasEvent(
            CanvasEventType.AddImage, 
            new ImagePair(name, src, position, transition)
        );
    }

    //return: CanvasEvent
    static changeBackGround(src) { 
        return new CanvasEvent(
            CanvasEventType.ChangeBackGround, 
            new BackGroundPair(src)
        );
    }

    //return: CanvasEvent
    static drawText(text) { 
        return new CanvasEvent(
            CanvasEventType.DrawText, 
            new DrawTextPair(text)
        );
    }
    
    //return: CanvasEvent
    static showEnding(text) {
        return new CanvasEvent(
            CanvasEventType.ShowEnding,
            new DrawTextPair(text)
        );
    }

    //return: CanvasEvent
    static removeObject(name, transition) { 
        return new CanvasEvent(
            CanvasEventType.RemoveObject,
            new RemoveObjectPair(name, transition)
        );
    }

    get canvasEventType() { return this._canvasEventType; }

    //return: any
    get eventData() { return this._eventData; }
}

class ImagePair {
    //name: String, src: String, position: modelPosition transition: String
    constructor(name, src, positon, transition) {
        this._name = name;
        this._src = src;
        this._positon = positon;
        this._transition = transition;
    }

    get name() { return this._name; }
    get src() { return this._src; }
    get positon() { return this._positon; }
    get transition() { return this._transition; }
}

class BackGroundPair {
    //src: String
    constructor(src) {
        this._src = src;
    }

    get src() { return this._src; }
}

class DrawTextPair {
    //text: String
    constructor(text) {
        this._text = text;
    }

    get text() { return this._text; }
}

class RemoveObjectPair {
    //name: String
    constructor(name, transition) {
        this._name = name;
        this._transition = transition;
    }
    get name() { return this._name; }
    get transition() { return this._transition; }
}

//SoundEventType: Number
const SoundEventType = {
    Background: 0,
    Sfx: 1
}

class SoundEvent extends BaseEvent {
    //src: String, soundEventType: SoundEventType, stop: bool
    constructor(src, soundEventType, stop) {
        super(EventType.Sound);
        this._src = src;
        this._soundEventType = soundEventType;
        this._stop = stop;
    }

    static background(src) {
        return new SoundEvent(src, SoundEventType.Background, false);
    }

    static stopbackground() {
        return new SoundEvent(null, SoundEventType.Background, true);
    }

    static sfx(src) {
        return new SoundEvent(src, SoundEventType.Sfx, false);
    }

    get src() { return this._src; }
    get soundEventType() { return this._soundEventType; }
    get stop() { return this._stop; }
}

class DelayEvent extends BaseEvent {
    //delay: Number
    constructor(delay) {
        super(EventType.Delay);
        this._delay = delay;
    }

    static delay(delay) {
        return new DelayEvent(delay);
    }

    get delay() { return this._delay; }
}

class TextBarController {
    constructor(callback) {
        this._chatBox = null;
        this._nameBox = null;
        this._callback = callback;
    }

    //chatBox: HTMLElement, nameBox: HTMLElement
    init(chatBox, nameBox) {
        this._chatBox = chatBox;
        this._nameBox = nameBox;
    }

    //name: String, text: String
    setText(name, text) { 
        //const chatBox = document.getElementById("chatBox");
        if(name == null) {
            this._nameBox.style.visibility = "hidden";
            this._nameBox.innerHTML = "";
        } else{
            this._nameBox.style.visibility = "visible";
            this._nameBox.innerHTML = name;
        }
        this._chatBox.innerHTML = text + "<br>";
    }

    //options: BranchPair[], o: any, return: String
    showBranch(options, o) { 
        let button = [];
        let label = [];
        let text = [];
        for(let i = 0; i < options.length; i++){
            label[i] = document.createElement('label');
            button[i] = document.createElement('button');
            text[i] = document.createElement('span');
            this._chatBox.appendChild(label[i]);
            label[i].appendChild(button[i]);
            label[i].appendChild(text[i]);
            label[i].appendChild(document.createElement('br'));
            text[i].innerHTML = "→" + options[i].name;

            eventlistener(i).then((resolvedData) => {
                // 백엔드 서버로 선택지 정보 전송
                this.sendChoiceToServer(resolvedData.name, resolvedData.branch);
                this._callback(resolvedData, o);
            });
        }
        const tmpThis = this;
        function eventlistener(i) {
            return new Promise(function(resolve, reject) {
                button[i].addEventListener('click', function(event) {
                    resolve(options[i]);
                    tmpThis.clearTextBar();
                }, false);
            })
        }
    }
    
    // 선택지 정보를 백엔드 서버로 전송하는 메소드
    sendChoiceToServer(choiceId, branchName) {
        // 현재 저장된 해시가 없으면 초기 해시 사용
        const previousPathHash = localStorage.getItem('currentPathHash') || 'INITIAL_HASH';
        
        // 선택 경로 기록 (선택적)
        let choicePath = JSON.parse(localStorage.getItem('choicePath') || '[]');
        choicePath.push(choiceId);
        localStorage.setItem('choicePath', JSON.stringify(choicePath));
        
        // 선택지 ID 생성 (브랜치 이름을 기반으로)
        const uniqueChoiceId = `choice_${branchName}_${Date.now()}`;
        
        console.log(`선택지 선택: ${choiceId}, 브랜치: ${branchName}, 이전 해시: ${previousPathHash}`);
        console.log(`생성된 고유 선택지 ID: ${uniqueChoiceId}`);
        
        // 백엔드 서버로 선택지 정보 전송
        fetch('/record-choice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                choiceId: uniqueChoiceId, // 고유한 선택지 ID 사용
                previousPathHash: previousPathHash,
                choicePath: choicePath,
                branchName: branchName,
                choiceText: choiceId // 원래 선택지 텍스트도 함께 전송
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`새 해시 생성됨: ${data.newHash}`);
                localStorage.setItem('currentPathHash', data.newHash);
            } else {
                console.error('해시 생성 실패:', data.message);
            }
        })
        .catch(error => {
            console.error('서버 통신 오류:', error);
            // 오류 발생 시에도 로컬에 기록 (오프라인 모드 지원)
            const fallbackHash = `local_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem('currentPathHash', fallbackHash);
            console.log(`오프라인 모드: 로컬 해시 생성 ${fallbackHash}`);
        });
    }

    clearTextBar() {
        while(this._chatBox.hasChildNodes()){
            this._chatBox.removeChild(this._chatBox.firstChild);
        }
        this._nameBox.style.visibility = "hidden";
        this._nameBox.innerHTML = "";
    }
}

//imageShowType: Number
const imageShowType = {
	Appear: 0,
    FadeIn: 1
}

//imageHideType: Number
const imageHideType = {
	Disappear: 0,
    FadeOut: 1
}

//modelPosition: Number
const modelPosition = {
    left: 0,
    center: 1,
    right: 2
}

class CanvasController {
    constructor() {
        this._canvasImg = null;
        this._leftImg = null;
        this._centerImg = null;
        this._rightImg = null;
    }

    //canvasImg: HTMLElement, leftImg: HTMLElement, centerImg: HTMLElement, rightImg: HTMLElement
    init(canvasImg, leftImg, centerImg, rightImg) {
        this._canvasImg = canvasImg;
        this._canvasImg.style.opacity = "0";
        this._canvasImg.style.transitionDuration = "1s";
        this._leftImg = leftImg;
        this._centerImg = centerImg;
        this._rightImg = rightImg;
        const img = document.getElementById('canvasDiv').getElementsByClassName('img');
        for(let i = 0; i < 3; i++){
            img[i].style.opacity = 0;
        }
    }
    //name: String, src: String, positon: modelPosition transition: imageShowType
    imageShow(name, src, position, transition) { // 
        let img;
        if(position === 0) {
            img = this._leftImg;
        }
        else if(position === 1) {
            img = this._centerImg;
        }
        else if(position === 2) {
            img = this._rightImg;
        }
        img.src = src;
        img.className = name;
        img.style.width = "40vw";
        if(transition === 1){
            
            img.style.transition = '2s';
            img.style.opacity = '1';
            //img.classList.add("show");
        }
        else{
            img.style.transition = 'all 0s';
            img.style.opacity = '1';
            //img.classList.add("showImmediately");
        }

    }
    
    //name: String, transition: imageHideType
    imageRemove(name, transition) { 
        //name으로 이미지를 지울수 있음
        const img = document.getElementById('canvasDiv').getElementsByClassName(name)[0];
        if(img === undefined) return;
        img.className = "";
        if(transition === 1) {
            img.style.transition = '2s';
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = "";
            }, 2000);
        }
        else{
            img.style.transition = '0s';
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = "";
            }, 1000);
        }
    }

    //src: String
    setBackground(src) {
        this._canvasImg.style.opacity = "0";
        setTimeout(() => {
            this._canvasImg.src = src;
        }, 1000);
        setTimeout(() => {
            this._canvasImg.style.opacity = "1";
        }, 2000);
    }

    //text: String
    drawtext(text){ //null 넣으면 지워짐
        if(text === null){
            this._chatBox.innerHTML = "";
            return;
        }
        this._chatBox.innerHTML = text;
    }

    //text: String
    endScreen(text) {
        const canvasDiv = document.getElementById('canvasDiv');
        while(canvasDiv.firstChild){
            canvasDiv.removeChild(canvasDiv.firstChild);
        }
        
        canvasDiv.style.backgroundColor = "black";
        canvasDiv.classList.add("endScreen");
        canvasDiv.innerHTML = text;
        canvasDiv.style.color = "white";
        canvasDiv.style.paddingTop = "27vw";

        setTimeout(() => {
            location.href = "main.html";
        }, 5000);
    }
}

class BranchManager {
    constructor() {
        this._branches = [];
    }
    
    //branch: Branch
    addBranch(branch) {
        this._branches.push(branch);
    }

    //branchName: String, return: Branch
    getBranch(branchName) {
        const find = this._branches.find(branch => branch.branchName === branchName);
        if (find === undefined)
            return null;
        else
            return find;
    }
}

class Branch {
    //branchName: String, end: String
    constructor(branchName, end) {
        this._branchName = branchName;
        this._end = end;
        //pages: Page[]
        this._pages = [];
    }

    //page: Page, return: Branch
    addPage(page) {
        this._pages.push(page);
        return this;
    }

    //name: String, text: String, return: Branch
    addTextPage(name, text) {
        this.addPage(new Page().addEvent(TextBarEvent.text(name, text)));
        return this;
    }

    //src: String, return: Branch
    addBackbroundPage(src){
        this.addPage(new Page().addEvent(CanvasEvent.changeBackGround(src)));
        return this;
    }

    //baseEvents: BaseEvent[]
    addEventsAsPage(baseEvents) {
        const page = new Page();
        baseEvents.forEach(element => {
            page.addEvent(element);
        });
        this.addPage(page);
        return this;
    }

    //text: String
    addEndingAsPage(text) {
        this.addPage(new Page().addEvent(CanvasEvent.showEnding(text)));
        return this;
    }

    //return: Page
    removePage() {
        return this._pages.pop();
    }

    //return: String
    get branchName() { return this._branchName; }
    //return: String
    get end() { return this._end; }
    //return: Page[]
    get pages() { return this._pages; }
}

class SoundController {
    constructor() {
        this._backgroundSound = new Audio();
        this._activeSound = new Audio();
        this._backgroundSound.volume = 0.2;
        this._activeSound.volume = 0.2;
    }

    //src: String
    playBackground(src) {
        this._backgroundSound.src = src;
        this._backgroundSound.play();
    }

    stopBackground() {
        this._backgroundSound.pause();
        this._backgroundSound.src = "";
    }

    //src: String
    playSound(src) {
        this._activeSound.src = src;
        this._activeSound.play();
    }
}