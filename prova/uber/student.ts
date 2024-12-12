function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Pessoa {
    private name: string;
    private money: number;

    constructor(name: string, money: number){
        this.name = name;
        this.money = money;
    }
    public getName(): string{
        return this.name;
    }
    public getMoney(): number{
        return this.money;
    }
    public setName(value: string): void{
        this.name = value;
    }
    public setMoney(value: number): void{
        if(this.money <= 0){
            this.money = 0;
        }
        this.money += value; 
    }
    toString(): string{
        return `${this.name}:${this.money}`
    }
}
class Moto{
    private cost: number;
    private driver: Pessoa| null;
    private passenger: Pessoa | null; 

    constructor(){
        this.cost = 0;
        this.driver = null;
        this.passenger = null;
    }
    public getPassenger(): Pessoa| null{
        return this.passenger;
    }
    public getDriver(): Pessoa | null{
        return this.driver;
    }
    public getCost(): number{
        return this.cost;
    }
    public setPassenger(name: Pessoa | null): void{
       this.passenger = name;
    }
    public setDriver(name: Pessoa): void {
        this.driver = name;
    }
    public setCost(value: number): void{
        this.cost += value;
    }
    public drive(distance: number): void{
        this.setCost(distance);
    }
    public leavePass(): void{
        this.passenger?.setMoney(-this.getCost());
        if(this.passenger?.getMoney() != null){
            if(this.passenger.getMoney() <= 0){
                console.log("fail: Passenger does not have enough money")
                this.passenger?.setMoney(0);
            }
        }
        this.driver?.setMoney(this.getCost());
        console.log(this.getPassenger() + " leave");
        this.setCost(-this.getCost());
        this.setPassenger(null);
    }
    toString(): string {
        if(this.getDriver() == null) {
            return `Cost: ${this.getCost()}, Driver: None, Passenger: None`;
        }
        if(this.getPassenger() == null) {
            return `Cost: ${this.getCost()}, Driver: ${this.getDriver()}, Passenger: None`;
        }
        return `Cost: ${this.getCost()}, Driver: ${this.getDriver()}, Passenger: ${this.getPassenger()}`;
    }

}

class Adapter {
    moto: Moto = new Moto();

    setDriver(name: string, money: number): void {
        this.moto.setDriver(new Pessoa(name, money));
    }
    setPassenger(name: string, money: number): void {
        this.moto.setPassenger(new Pessoa(name, money))
    }

    drive(distance: number): void {
        this.moto.drive(distance)
    }
    leavePassenger(): void {
        this.moto.leavePass();
    }

    show(): void {
        console.log(this.moto.toString())
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.leavePassenger();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
}

main();
