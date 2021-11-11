import React from "react";
import CollapseWrapper from "../common/collapse";
import PropTypes from "prop-types";

const ListComponent = ({ children }) => {
    return React.Children.map(children, (child, index) => {
        const config = {
            ...child.props,
            index
        };

        return React.cloneElement(child, config);
    });
};
ListComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <ListComponent>
                <Component />
                <Component />
                <Component />
            </ListComponent>
        </CollapseWrapper>
    );
};

const Component = ({ index }) => {
    return <div>Компонент списка: {index}</div>;
};

Component.propTypes = {
    index: PropTypes.number
};

export default ChildrenExercise;
