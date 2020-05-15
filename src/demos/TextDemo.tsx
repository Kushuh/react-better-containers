import * as React from 'react';
import Text from '../components/text/Text';

class TextDemo extends React.Component<{}, any> {
    constructor(props) {
        super(props);

        this.setMode = this.setMode.bind(this);
    }

    state = {
        displayPlaceholder: true,
        mode: 'lines'
    };

    setMode(event) {
        this.setState({mode: event.target.value});
    }

    toggleDisplay = () => {
        this.setState(
            ({displayPlaceholder}) => ({displayPlaceholder: !displayPlaceholder})
        );
    };

    render() {
        return (
            <div>
                <Text
                    forcePlaceholder={this.state.displayPlaceholder}
                    placeholderOptions={{
                        color: this.state.mode === 'lines' ? '#eaeaea' : '#ccc',
                        linesHeight: 0.8
                    }}
                    placeholder={this.state.mode}
                    tag='h1'
                >My super title.</Text>
                <Text
                    forcePlaceholder={this.state.displayPlaceholder}
                    placeholderOptions={{color: this.state.mode === 'lines' ? '#eaeaea' : '#ccc'}}
                    placeholder={this.state.mode}
                >
                    If you can see me then my fontFace has loaded.
                </Text>
                <br/>
                <Text
                    forcePlaceholder={this.state.displayPlaceholder}
                    placeholderOptions={{color: this.state.mode === 'lines' ? '#eaeaea' : '#ccc'}}
                    placeholder={this.state.mode}
                    style={{maxWidth: '30em'}}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam efficitur dolor, sit amet posuere purus. Praesent id urna risus. Morbi tristique, est eget ullamcorper tempus, mauris ipsum vehicula dui, ac blandit sapien magna in neque.<br/> Donec eu leo pharetra, cursus orci sit amet, convallis metus. Vivamus nulla orci, sagittis a dictum sed, pretium quis metus. Nunc efficitur vitae ligula in blandit. Sed at placerat ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce gravida a arcu ut commodo. Aenean auctor dui tortor, nec scelerisque metus rutrum et. Pellentesque et elit vitae justo egestas placerat sed nec neque.
                </Text>

                <Text
                    forcePlaceholder={this.state.displayPlaceholder}
                    placeholderOptions={{color: this.state.mode === 'lines' ? '#eaeaea' : '#ccc'}}
                    placeholder={this.state.mode}
                    tag='button'
                >
                    It also works with other tags!
                </Text>

                <br/>
                <br/>
                <hr/>

                <button onClick={this.toggleDisplay}>
                    {`Click me to ${this.state.displayPlaceholder ? 'un' : ''}blur the text.`}
                </button>

                <br/>

                <h2>
                   Select blur mode
                </h2>

                <div onChange={this.setMode}>
                    <input type='radio' id='lines' value='lines' checked={this.state.mode === 'lines'}/>
                    <label htmlFor="lines">lines (default)</label>
                    <input type='radio' id='blurry' value='blurry' checked={this.state.mode === 'blurry'}/>
                    <label htmlFor="blurry">blurry</label>
                    <input type='radio' id='none' value='none' checked={this.state.mode === 'none'}/>
                    <label htmlFor="none">none</label>
                </div>
            </div>
        );
    }
}

export default TextDemo;