import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReversedFlatList from 'react-native-reversed-flat-list';
import BookingChatAtom from '../Atoms/BookingChatAtom';
import { chatList } from '../config/data';
import { BASE_URL } from '../config/api';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories, showBookingButton, getIssues, showBookingFunc } from "../Actions/fetchActions";
import DatePickerAtom from '../Atoms/DatePickerAtom';

class ChatPage extends Component {
  async componentDidMount(){
    if (this.state.token){
      this.props.getCategories(this.state.token);
    } else {
      this.setState({ loading: true })
    }
  }

  static getDerivedStateFromProps(props, state){
    if (props.userIdToken.token !== state.token){
      props.getCategories(props.userIdToken.token)
        return {
            token: props.userIdToken.token,
            loading: false
        }
    }
    if (props.categories !== state.categories){
      const subCategoryTypes = [...new Set(props.categories.map(val => val.sub_category))]
      const unique = [...new Set(props.categories.map(val => val.category))]
      state.item[2].body = unique;
      state.scheduledItem[1].body = unique;
      return {
        item: state.item,
        scheduledItem: state.scheduledItem,
        categories: props.categories,
        loading: false,
        uniqueCategories: unique,
        subCategoryTypes
      }
    }
    if (props.issues !== state.issues){
      const issues = [...new Set(props.issues.map(val => val.issues))];
      return {
        issues: props.issues,
        uniqueIssues: issues
      }
    }
    return null;
  }

  state = {
    token: '',
    issuesBoolean: false,
    type: '',
    category: '',
    sub_category: '',
    sub_issue: '',
    othersValue: '',
    dunno: false,
    others: false,
    issue: '',
    price: '',
    category_id: null,
    categories: [],
    issues: [],
    item: [
      {
        key: '1',
        type: 'raven',
        body: 'Hello, \nHaving a good day, are we?',
        additional: 'Who would you like to find?'
      },
      {
          key: '2',
          type: 'ravenandreply',
          body: 'Who would you like to find?',
          additional: ''
      },
      {
          key: '3',
          type: 'reply',
          body: [],
          additional: ''
      }
    ],
    scheduledItem: [
      {
        key: '1',
        type: 'raven',
        body: 'Who would you like to find?',
        additional: ''
      },
      {
        key: '2',
        type: 'reply',
        body: [],
        additional: ''
      }
    ],
    uniqueCategories: [],
    uniqueIssues: [],
    newIndex: 3,
    loading: false,
    subCategoryTypes: [],
    dateTime: true,
    day: '',
    time: ''
  }

  definePath = async (value) => {
    console.log(value, this.state.type, this.state.category, this.state.price)
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    let raven;
    let obj;
    switch(true){
      case ((this.state.type === "continue" && value === "Cancel") || (this.state.type === "issues" && value === "Cancel") || (this.state.type === "one sub issue" && value === "Cancel") || (this.state.type === "I don't know" && value === "Cancel")):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please do you want to make a correction or a final cancellation`,
        additional: ''
      }
      let cancelObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Select another Professional", "Select another Issue", "Final Cancellation"],
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, type: "cancelled" }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, cancelObject], newIndex: this.state.newIndex + 1 }), 1000);
      }); 
      case (this.state.type === "cancelled" && value === "Select another Professional" ):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You can select another professional now`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: this.state.uniqueCategories,
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, type: "" }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "cancelled" && value === "Select another Issue" ):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You can select another professional now`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: this.state.uniqueIssues,
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, type: "" }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      }); 
      case (this.state.type === "cancelled" && value === "Final Cancellation" ):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You just clicked the Final Cancellation. Thank you, I hope to see you soon...`,
        additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, type: "" })
      case (this.state.type === "issues" && value === "Continue"):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category, price: this.state.price },
          additional: ''
      }
      console.log(obj)
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, type: "issues" }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "one sub issue" && value === "Continue"):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category, price: this.state.price },
          additional: ''
      }
      console.log(obj)
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, type: "one sub issue" }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "one sub issue" && value !== "Cancel"):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Price of this service is ${this.state.price}`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, sub_issue: value }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "Others" && this.state.others === true && value !== ''):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Our professional will come to investigate this issue`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, others: false, othersValue: value }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "Others" && value === 'Continue'):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category },
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, othersValue: value, type: 'issues' }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "I don't know" && value === 'Continue'):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category },
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, dunno: true }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
    }
  }

  definePathSchedule = async (value) => {
    console.log(value, this.state.type, this.state.category, this.state.price)
    let newState = Object.assign({}, this.state);
    newState.scheduledItem[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    let raven;
    let obj;
    switch(true){
      case ((this.state.type === "continue" && value === "Cancel") || (this.state.type === "issues" && value === "Cancel") || (this.state.type === "one sub issue" && value === "Cancel") || (this.state.type === "I don't know" && value === "Cancel")):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please do you want to make a correction or a final cancellation`,
        additional: ''
      }
      let cancelObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Select another Professional", "Select another Issue", "Final Cancellation"],
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, type: "cancelled" }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, cancelObject], newIndex: this.state.newIndex + 1 }), 1000);
      }); 
      case (this.state.type === "cancelled" && value === "Select another Professional" ):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You can select another professional now`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: this.state.uniqueCategories,
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, type: "" }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "cancelled" && value === "Select another Issue" ):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You can select another professional now`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: this.state.uniqueIssues,
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, type: "" }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      }); 
      case (this.state.type === "cancelled" && value === "Final Cancellation" ):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You just clicked the Final Cancellation. Thank you, I hope to see you soon...`,
        additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, type: "" })
      case (this.state.type === "issues" && value === "Continue"):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category, price: this.state.price, day: this.state.day, time: this.state.time },
          additional: ''
      }
      console.log(obj)
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, type: "issues" }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "one sub issue" && value === "Continue"):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category, price: this.state.price, day: this.state.day, time: this.state.time },
          additional: ''
      }
      console.log(obj)
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, type: "one sub issue" }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "one sub issue" && value !== "Cancel"):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Price of this service is ${this.state.price}`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, sub_issue: value }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "Others" && this.state.others === true && value !== ''):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Our professional will come to investigate this issue`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, others: false, othersValue: value }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "Others" && value === 'Continue'):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category, day: this.state.day, time: this.state.time },
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, othersValue: value, type: 'issues' }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (this.state.type === "I don't know" && value === 'Continue'):
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Please confirm Job details`,
        additional: ''
      }
      obj = {
          key: (this.state.newIndex + 2).toString(),
          type: 'confirm',
          body: { category: this.state.category, day: this.state.day, time: this.state.time },
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, dunno: true }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, obj], newIndex: this.state.newIndex + 1 }), 1000);
      });
    }
  }

  getSubIssues = async (value) => {
    let raven;
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    let array = this.state.issues.filter((each)=> each.issues === value);
    switch(true){
    case (array.length === 1 && array[0].issues_id !== 0 && array[0].sub_issues === ""):
      // normal issue, go to price
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Price of this service is ${array[0].price}`,
        additional: ''
      }
      let priceObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "issues", price: `${array[0].price}` }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, priceObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (array.length === 1 && array[0].issues_id > 0 && array[0].sub_issues !== ""):
      // normal issue, go to price
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `We only offer one type for this issue`,
        additional: ''
      }
      let rareObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", `${array[0].sub_issues}`],
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "one sub issue", price: array[0].price }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, rareObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
    case (array.length === 1 && array[0].issues_id === 0) :
      // others issue
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You can tell me more about the issue`,
        additional: ''
      }
      let othersObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: 'text-input',
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "Others", others: true }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, othersObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
    case (array.length === 1 && array[0].issues_id < 0):
      // I don't know issue
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Our professional will come to investigate this issue`,
        additional: ''
      }
      let dunnoObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "I don't know" }, 
      async ()=>{
        await setTimeout(()=>this.setState({item: [...this.state.item, dunnoObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
    case (array.length > 1):
      // sub issues available 
      let uniqueSubIssues = [...new Set(array.map(val => val.sub_issues))]
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: 'What type is it?',
        additional: ''
      }
      let subIssueObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: uniqueSubIssues,
          additional: ''
      }
      return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "sub issues" }, 
        async ()=>{
          await setTimeout(()=>this.setState({item: [...this.state.item, subIssueObject], newIndex: this.state.newIndex + 1 }), 1000);
        });
    }
  }

  getSubIssuesSchedule = async (value) => {
    let raven;
    let newState = Object.assign({}, this.state);
    newState.scheduledItem[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    let array = this.state.issues.filter((each)=> each.issues === value);
    switch(true){
    case (array.length === 1 && array[0].issues_id !== 0 && array[0].sub_issues === ""):
      // normal issue, go to price
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Price of this service is ${array[0].price}`,
        additional: ''
      }
      let priceObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "issues", price: `${array[0].price}` }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, priceObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
      case (array.length === 1 && array[0].issues_id > 0 && array[0].sub_issues !== ""):
      // normal issue, go to price
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `We only offer one type for this issue`,
        additional: ''
      }
      let rareObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", `${array[0].sub_issues}`],
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "one sub issue", price: array[0].price }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, rareObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
    case (array.length === 1 && array[0].issues_id === 0) :
      // others issue
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `You can tell me more about the issue`,
        additional: ''
      }
      let othersObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: 'text-input',
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "Others", others: true }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, othersObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
    case (array.length === 1 && array[0].issues_id < 0):
      // I don't know issue
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: `Our professional will come to investigate this issue`,
        additional: ''
      }
      let dunnoObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: ["Cancel", "Continue"],
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "I don't know" }, 
      async ()=>{
        await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, dunnoObject], newIndex: this.state.newIndex + 1 }), 1000);
      });
    case (array.length > 1):
      // sub issues available 
      let uniqueSubIssues = [...new Set(array.map(val => val.sub_issues))]
      raven = {
        key: (this.state.newIndex + 1).toString(),
        type: 'raven',
        body: 'What type is it?',
        additional: ''
      }
      let subIssueObject = {
          key: (this.state.newIndex + 2).toString(),
          type: 'reply',
          body: uniqueSubIssues,
          additional: ''
      }
      return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "sub issues" }, 
        async ()=>{
          await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, subIssueObject], newIndex: this.state.newIndex + 1 }), 1000);
        });
    }
  }

  getIssues = async (value) => {
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    let array = this.state.categories.filter((each)=> (each.category === this.state.category && each.sub_category === value)); 
    let id = array[0].id;
    this.props.getIssues(id, this.state.token);
    this.setState({ category_id: id })
    let raven = {
      key: (this.state.newIndex + 1).toString(),
      type: 'raven',
      body: 'Kindly describe what exactly needs to be fixed?',
      additional: ''
    }
    fetch(`${BASE_URL}/v1/issues/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-user-token': this.state.token
      }
    })
    .then((res)=> res.json())
    .then((responseJson)=>{
        if (responseJson.status==="success"){
          const issues = [...new Set(responseJson.data.map(val => val.issues))];
          let issueObject = {
            key: (this.state.newIndex + 2).toString(),
            type: 'reply',
            body: issues,
            additional: ''
          }
          this.setState({item: [...this.state.item, raven], issues: responseJson.data, uniqueIssues: issues, newIndex: this.state.newIndex + 1, issuesBoolean: true },
            async ()=>{
              await setTimeout(()=>this.setState({item: [...this.state.item, issueObject], newIndex: this.state.newIndex + 1 }), 1000);
            });
        }
    })
    .catch((err)=>console.log(err));
  }

  getIssuesSchedule = async (value) => {
    console.log(this.state.newIndex, this.state);
    console.log('getIssuesSchedule ran', value)
    let newState = Object.assign({}, this.state);
    newState.scheduledItem[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    let array = this.state.categories.filter((each)=> (each.category === this.state.category && each.sub_category === value)); 
    let id = array[0].id;
    this.props.getIssues(id, this.state.token);
    this.setState({ category_id: id })
    let raven = {
      key: (this.state.newIndex + 1).toString(),
      type: 'raven',
      body: 'Kindly describe what exactly needs to be fixed?',
      additional: ''
    }
    fetch(`${BASE_URL}/v1/issues/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-user-token': this.state.token
      }
    })
    .then((res)=> res.json())
    .then((responseJson)=>{
        if (responseJson.status==="success"){
          const issues = [...new Set(responseJson.data.map(val => val.issues))];
          let issueObject = {
            key: (this.state.newIndex + 2).toString(),
            type: 'reply',
            body: issues,
            additional: ''
          }
          this.setState({scheduledItem: [...this.state.scheduledItem, raven], issues: responseJson.data, uniqueIssues: issues, newIndex: this.state.newIndex + 1, issuesBoolean: true },
            async ()=>{
              await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, issueObject], newIndex: this.state.newIndex + 1 }), 1000);
            });
        }
    })
    .catch((err)=>console.log(err));
  }

  getSubCategories = async (value) => {
    this.props.showBookingButton(false);
    let newArray = [];
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    let raven = {
      key: (this.state.newIndex + 1).toString(),
      type: 'raven',
      body: 'What specific type of service do you want?',
      additional: ''
    }
    let array = this.state.categories.filter((each)=> each.category === value);
    newArray = array.map((val)=>val.sub_category)
    let subCategoryObject = {
        key: (this.state.newIndex + 2).toString(),
        type: 'reply',
        body: newArray,
        additional: ''
    }
    await this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, category: value });
    await setTimeout(()=>this.setState({item: [...this.state.item, subCategoryObject], newIndex: this.state.newIndex + 1 }), 1000);
  }

  getSubCategoriesSchedule = async (value) => {
    console.log('getSubCategoriesSchedule ran')
    this.props.showBookingButton(false);
    let newArray = [];
    let newState = Object.assign({}, this.state);
    newState.scheduledItem[this.state.newIndex - 2].body = [value];
    this.setState(newState);
    let raven = {
      key: (this.state.newIndex).toString(),
      type: 'raven',
      body: 'What specific type of service do you want?',
      additional: ''
    }
    let array = this.state.categories.filter((each)=> each.category === value);
    newArray = array.map((val)=>val.sub_category)
    console.log(newArray)
    let subCategoryObject = {
        key: (this.state.newIndex + 1).toString(),
        type: 'reply',
        body: newArray,
        additional: ''
    }
    await this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex, category: value }, ()=>console.log(this.state.newIndex + 1, this.state.scheduledItem));
    await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, subCategoryObject], newIndex: this.state.newIndex + 1 }), 1000);
  }

  itemList = async (value) => {
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    const newObjectFromChatList = chatList[this.state.newIndex];
    await this.setState({item: [...this.state.item, newObjectFromChatList], newIndex: this.state.newIndex + 1 });
    console.log(this.state.newIndex);
    const nextObjectFromChatList = await chatList[this.state.newIndex];
    await setTimeout(()=>this.setState({item: [...this.state.item, nextObjectFromChatList], newIndex: this.state.newIndex + 1 }), 1000);
    console.log(this.state.newIndex);
  }

  confirmedBooking = () => {
    if (this.state.issue !== '') {
      this.props.navigation.navigate('Share', { 
        category: this.state.category.toLowerCase(),
        price: this.state.price,
        issue: this.state.issue
      });
    }
  }

  confirmedBookingSchedule = () => {
    console.log('Scheduled Booking Completed')
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = ["Confirmed"];
    this.setState(newState);
    let raven = {
      key: (this.state.newIndex + 1).toString(),
      type: 'raven',
      body: `Professional scheduled for ${this.state.day} by ${this.state.time}. Thank you. \n What would you like to do next?`,
      additional: ''
    }
    let dunnoObject = {
        key: (this.state.newIndex + 2).toString(),
        type: 'reply',
        body: ["Get a pro", "Give Feedback/Complaint", "Get familiar"],
        additional: ''
    }
    return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, issuesBoolean: false, issue: value, type: "" }, 
    async ()=>{
      await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, dunnoObject], newIndex: this.state.newIndex + 1 }), 1000);
    });
  }

  bigCancel = (value) => {
    console.log('Value is: ',value);
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = value;
    this.setState(newState, ()=>console.log(this.state.item));
    let raven = {
      key: (this.state.newIndex + 1).toString(),
      type: 'raven',
      body: `Please do you want to make a correction or a final cancellation`,
      additional: ''
    }
    let cancelObject = {
        key: (this.state.newIndex + 2).toString(),
        type: 'reply',
        body: ["Select another Professional", "Select another Issue", "Final Cancellation"],
        additional: ''
    }
    return this.setState({item: [...this.state.item, raven], newIndex: this.state.newIndex + 1, type: "cancelled" }, 
    async ()=>{
      await setTimeout(()=>this.setState({item: [...this.state.item, cancelObject], newIndex: this.state.newIndex + 1 }), 1000);
    }); 
  }

  bigCancelSchedule = (value) => {
    console.log('Value is: ',value);
    let newState = Object.assign({}, this.state);
    newState.scheduledItem[this.state.newIndex - 1].body = value;
    this.setState(newState, ()=>console.log(this.state.scheduledItem));
    let raven = {
      key: (this.state.newIndex + 1).toString(),
      type: 'raven',
      body: `Please do you want to make a correction or a final cancellation`,
      additional: ''
    }
    let cancelObject = {
        key: (this.state.newIndex + 2).toString(),
        type: 'reply',
        body: ["Select another Professional", "Select another Issue", "Final Cancellation"],
        additional: ''
    }
    return this.setState({scheduledItem: [...this.state.scheduledItem, raven], newIndex: this.state.newIndex + 1, type: "cancelled" }, 
    async ()=>{
      await setTimeout(()=>this.setState({scheduledItem: [...this.state.scheduledItem, cancelObject], newIndex: this.state.newIndex + 1 }), 1000);
    }); 
  }

  renderItem = ({ item }) => {
    if (this.props.showBooking === 'instant'){
        return (
          <BookingChatAtom 
          confirm={this.confirmedBooking}
          bigCancel={this.bigCancel}
          body={item.body}
          type={item.type}
          additional={item.additional}
          onPress={(value)=>
            (item.type === 'reply' && this.state.uniqueCategories.includes(value)) ? 
            this.getSubCategories(value)
            : (item.type === 'reply' && this.state.subCategoryTypes.includes(value)) ? 
            this.getIssues(value)
            : (item.type === 'reply' && this.state.uniqueIssues.includes(value)) ? 
            this.getSubIssues(value)
            :(item.type === 'reply' && this.state.type !== "") ? 
            this.definePath(value)
            : this.itemList(value)} />
        );
      } else if (this.props.showBooking === 'scheduled'){
        return (
          <BookingChatAtom 
          confirm={this.confirmedBookingSchedule}
          bigCancel={this.bigCancelSchedule}
          body={item.body}
          type={item.type}
          additional={item.additional}
          onPress={(value)=>
            (item.type === 'reply' && this.state.uniqueCategories.includes(value)) ? 
            this.getSubCategoriesSchedule(value)
            : (item.type === 'reply' && this.state.subCategoryTypes.includes(value)) ? 
            this.getIssuesSchedule(value)
            : (item.type === 'reply' && this.state.uniqueIssues.includes(value)) ? 
            this.getSubIssuesSchedule(value)
            :(item.type === 'reply' && this.state.type !== "") ? 
            this.definePathSchedule(value)
            : this.itemList(value)} />
        );
      }
  }

  displayFlatList = () => {
      return (
        <ScrollView
        style={{ maxHeight: Dimensions.get('window').height - 80, width: '100%' }}
        ref={ref => this.scrollv = ref}
        onContentSizeChange={() => this.scrollv.scrollToEnd({ animated: false })}
        onLayout={() => this.scrollv.scrollToEnd({ animated: false })}
        >
          <ReversedFlatList
            style={{ width: '100%', backgroundColor: 'transparent', }}
            data={this.props.showBooking === 'instant' ? this.state.item : this.state.scheduledItem}
            renderItem={(b)=>this.renderItem(b)}
          />
        </ScrollView>
      )
  }

  render() {
    return (
      <View style={{ bottom: 0, position: 'absolute', backgroundColor: 'transparent',
      opacity: .9,
      width: '100%'
      }}>
          {
            (this.props.showBooking === 'instant') &&
            <ScrollView
            style={{ maxHeight: Dimensions.get('window').height - 80, width: '100%' }}
            ref={ref => this.scrollv = ref}
            onContentSizeChange={() => this.scrollv.scrollToEnd({ animated: false })}
            onLayout={() => this.scrollv.scrollToEnd({ animated: false })}
            >
              <ReversedFlatList
                style={{ width: '100%', backgroundColor: 'transparent', }}
                data={this.state.item}
                renderItem={(b)=>this.renderItem(b)}
              />
            </ScrollView>
          }
          {
            (this.props.showBooking === 'scheduled' && this.state.dateTime === false) &&
            <ScrollView
            style={{ maxHeight: Dimensions.get('window').height - 80, width: '100%' }}
            ref={ref => this.scrollv = ref}
            onContentSizeChange={() => this.scrollv.scrollToEnd({ animated: false })}
            onLayout={() => this.scrollv.scrollToEnd({ animated: false })}
            >
              <ReversedFlatList
                style={{ width: '100%', backgroundColor: 'transparent' }}
                data={this.state.scheduledItem}
                renderItem={(b)=>this.renderItem(b)}
              />
            </ScrollView>
          }
          {
            (this.props.showBooking === 'scheduled' && this.state.dateTime) &&
            <DatePickerAtom 
            cancelSchedule={()=>this.props.showBookingFunc('instant')}
            onPress={(day, time)=>this.setState({ day, time, dateTime: false })}
            />
          }
      </View>
    );
  }
}

ChatPage.propsTypes = {
  getCategories: PropTypes.func.isRequired,
  showBookingButton: PropTypes.func.isRequired,
  showBookingFunc: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  showBooking: PropTypes.string.isRequired,
  categories: PropTypes.array,
  issues: PropTypes.array
}

const mapStateToProps = state => ({
  categories: state.fetch.categories,
  userIdToken: state.fetch.userIdToken,
  showBooking: state.fetch.showBooking, 
  issues: state.fetch.issues,
})

export default connect(mapStateToProps , { showBookingFunc, getCategories, showBookingButton, getIssues })(ChatPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
