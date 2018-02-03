import React from 'react';
import ReactQuill from 'react-quill';
// import axios from 'axios';

// import _ from 'lodash';

export default class MainEditor extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.getContentFromDelta = this.getContentFromDelta.bind(this);

    // this.debouncedParseContentMeaning = _.debounce(this.parseContentMeaning, 2000);
    // this.debouncedParseContentMeaning = _.throttle(this.parseContentMeaning, 2000);
  }

  componentWillMount() {
    // this.props.changeBackgroundColor('#1F1F1F');
  }

  componentDidMount() {
    const value = JSON.parse(window.localStorage.getItem('noteContent'));
    this.setState({ value });
  }

  handleEditorChange (value, d, source, editor) {
    const delta = editor.getContents();
    const packet = JSON.stringify(delta);
    this.setState({
      value, packet,
    });
    window.localStorage.setItem('noteContent', packet);
    const content = this.getContentFromDelta(delta);
  }


  getContentFromDelta (delta) {
    delta.ops.reduce((tv, cv) => (
      tv.concat(cv.insert.replace ? cv.insert.replace(/↵|\r\n|\r|\n|"|'/g, '') : cv.insert)
    ), '')
  };

  // TODO: Use return value from this function to build IntelliSearch
  // parseContentMeaning (content) (
  //   axios.post('api/parseContentMeaning', { content })
  //     .then(({ data: { meaning } }) => {
  //       console.log('Per Google, the meaning of your text is: ', meaning);
  //       this.props.setCurrentMeaning(meaning);
  //       return meaning;
  //     })
  // );


  // handlePrint = () => {
  //   const { packet } = this.state;
  //   axios.post('/api/tempSavePacket', { packet })
  //     .catch((e) => { console.error(e); });
  // }


  render() {
    return (
      <div>
        <ReactQuill
          theme='snow'
          value={this.state.value}
          onChange={this.handleEditorChange}
          placeholder="Let's take some notes!"
          formats={MainEditor.formats}
          modules={MainEditor.modules}
        />
      </div>
    );
  };
}


MainEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

MainEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
    { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ]
};
