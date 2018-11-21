import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView} from 'react-native';


const styles = StyleSheet.create({
   headerVal:{
      backgroundColor:'#0e5e8c',
      color:'white',
      textAlign: 'center',
      fontSize: 30,
   },
   textGroup:{
      backgroundColor: '#0e5e8c',
      padding:20,
      margin:15,
      marginBottom: 0,
   },
   heading:{
      color:'#ffffff',
      fontSize: 25,
      fontWeight: 'bold'
   },
   titleVal:{
      color: '#ffffff',
      fontSize: 20,
   },
   inputVal:{
      backgroundColor: '#ffffff',
      fontSize: 20,
      color:'#333333',
      marginHorizontal: 10
   },

});
export default class App extends Component<Props> {

  clearHandler(){
     //console.log('Cancel Pressed');
     //Alert.alert('', 'Are you sure you want to clear your fields?', [
       // {text: 'Yes', onPress: () => this.clearFields(), style: 'cancel'}, {text: 'No'},]);
       this.clearFields();
  }
  clearFields(){
     this.state.resText = '';
     this.setState({
        instructionVal: 2,
        resText:'',
        curText:'',
        voltText:'',
        powerText:'',
        resInput: true,
        curInput: true,
        voltInput: true,
        powerInput: true,
        resCount: 0,
        curCount: 0,
        voltCount: 0,
        powerCount: 0,
     });
  }

  calculateAll(){
     var r = this.state.resText;
     var i = this.state.curText;
     var v = this.state.voltText;
     var p = this.state.powerText;
     var temp1;
     var temp2;
     if(r != '' && i != ''){
        temp1 = r * i;
        temp2 = Math.pow(i,2) * r;
        this.state.voltText = temp1;
        this.state.powerText = temp2;
     }else if(r != '' && v != ''){
        temp1 = (v/r);
        temp2 = (Math.pow(2,v)/r);
        this.state.curText = temp1;
        this.state.powerText = temp2;
        temp1 = Math.sqrt(p/r);
        temp2 = Math.sqrt(p*r);
        this.state.curText = temp1;
        this.state.voltText = temp2;
     }else if(i != '' && v != ''){
        temp1 = v/i;
        temp2 = v*i;
        this.state.resText = temp1;
        this.state.powerText = temp2;
     }else if(i != '' && p != ''){
        temp1 = p/Math.pow(i,2);
        temp2 = p/i;
        this.state.resText = temp1;
        this.state.voltText = temp2;
     }else if(v != '' && p != ''){
        temp1 = Math.pow(v,2)/p;
        temp2 = p/v;
        this.state.resText = temp1;
        this.state.curText = temp2;
     }
  }
  resCapture(res){
     this.state.resText = res;
     if(res != '' && this.state.resCount == 0){
        this.state.resCount = 1;
        this.state.instructionVal -= 1;
     }
     if(res == '' && this.state.resCount == 1){
        this.state.instructionVal += 1;
        this.state.resCount = 0;
        this.resetInputFields();
     }
     if(this.state.instructionVal == 0){
        this.captureAll();
     }
  }
  curCapture(cur){
     this.state.curText = cur;
     if(cur != '' && this.state.curCount == 0){
        this.state.curCount = 1;
        this.state.instructionVal -= 1;
     }
     if(cur == '' && this.state.curCount == 1){
        this.state.instructionVal += 1;
        this.state.curCount = 0;
        this.resetInputFields();
     }
     if(this.state.instructionVal == 0){
        this.captureAll();
     }
  }
  voltCapture(volt){
     this.state.voltText = volt;
     if(volt != '' && this.state.voltCount == 0){
        this.state.voltCount = 1;
        this.state.instructionVal -= 1;
     }
     if(volt == '' && this.state.voltCount == 1){
        this.state.instructionVal += 1;
        this.state.voltCount = 0;
        this.resetInputFields();
     }
     if(this.state.instructionVal == 0){
        this.captureAll();
     }
  }
  powerCapture(power){
     this.state.powerText = power;
     if(power != '' && this.state.powerCount == 0){
        this.state.powerCount = 1;
        this.state.instructionVal -= 1;
     }
     if(power == '' && this.state.powerCount == 1){
        this.state.powerCount == 0;
        this.state.instructionVal += 1;
        this.resetInputFields();
     }
     if(this.state.instructionVal == 0){
        this.captureAll();
     }
  }
  //Call this function once two fields are filled in
  //to prevent input on other fields
  captureAll(){
     if(this.state.resCount == 0){
        this.state.resInput = false;
     }
     if(this.state.curCount == 0){
        this.state.curInput = false;
     }
     if(this.state.voltCount == 0){
        this.state.voltInput = false;
     }
     if(this.state.powerCount == 0){
        this.state.powerInput = false;
     }
     this.calculateAll();
  }
  resetInputFields(){
     this.state.resInput = true;
     this.state.curInput = true;
     this.state.voltInput = true;
     this.state.powerInput = true;
  }

  constructor(props){
     super(props);
     this.state={
        instructionVal: 2,
        resText:'',
        curText:'',
        voltText:'',
        powerText:'',
        resInput: true,
        curInput: true,
        voltInput: true,
        powerInput: true,
        resCount: 0,
        curCount: 0,
        voltCount: 0,
        powerCount: 0,
     };
  }

  render() {
    return (
      <ScrollView>
         <View style={styles.textGroup}>
            <Button onPress={() =>this.clearHandler()} title='Clear All Fields'/>
         </View>
         <View style={styles.textGroup}>
            <Text style={styles.heading}>
               Enter any {this.state.instructionVal} values
            </Text>
            <Text style={styles.titleVal}>Resistance(Ohms)</Text>
            <TextInput editable={this.state.resInput} keyboardType='numeric' placeholder='Enter Resistance' style={ styles.inputVal } value={this.state.resText}
               onChangeText={(resText) => {this.setState({resText}); this.resCapture(resText);}}/>
            <Text style={styles.titleVal}>Current(Amps)</Text>
             <TextInput editable={this.state.curInput} keyboardType='numeric' placeholder='Enter Current' style={ styles.inputVal } value={this.state.curText}
                onChangeText={(curText) => {this.setState({curText}); this.curCapture(curText);}}/>
             <Text style={styles.titleVal}>Voltage(Volts)</Text>
             <TextInput editable={this.state.voltInput} keyboardType='numeric' placeholder='Enter Voltage' style={ styles.inputVal } value={this.state.voltText}
              onChangeText={(voltText) => {this.setState({voltText}); this.voltCapture(voltText);}}/>
           <Text style={styles.titleVal}>Power(Watts)</Text>
             <TextInput editable={this.state.powerInput} keyboardType='numeric' placeholder='Enter Power' style={ styles.inputVal } value={this.state.powerText}
               onChangeText={(powerText) => {this.setState({powerText}); this.powerCapture(powerText);}}/>
         </View>

         <View style={styles.textGroup}>
            <Text style={styles.titleVal}>Resistance(Ohms) = {this.state.resText}</Text>
            <Text style={styles.titleVal}>Current(I) = {this.state.curText}</Text>
            <Text style={styles.titleVal}>Voltage(V) = {this.state.voltText}</Text>
            <Text style={styles.titleVal}>Power(P) = {this.state.powerText}</Text>
         </View>
      </ScrollView>




    );
  }
};
