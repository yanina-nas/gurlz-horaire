import { Calendar, Col, Row, Select, Badge, Tag, Tooltip } from 'antd';
import React from 'react';
import { parse, getMonth, getDate } from 'date-fns'
import { fr } from 'date-fns/locale'

const CalendarWidget = ({ headers, entries }) => {
  const onPanelChange = (value, mode) => {
    console.log('from onPanelChange', value, mode);
  };

  const getListData = (value) => {
    let listData = badges && badges?.[value.month()]?.[value.date()]
    return listData || [];
  };

  const dateCellRender = (value, badges) => {
    const listData = getListData(value);
    return (
      <div className="events">
        {listData.map((item, index) => (
          <div key={index}>
            {/* <Badge style={{wordBreak:"break-word", textOverflow: "ellipsis"}} color={item.color} text={item.content}/> */}
            <Tooltip placement="topLeft" trigger="click" title={item.content}>
              <Tag style={{wordBreak:"break-word", textOverflow: "ellipsis", maxWidth: "150px"}} color={item.color}>{item.content}</Tag>
            </Tooltip>
            {/* <Badge color={item.color} count={item.content} /> */}
          </div>
        ))}
      </div>
    );
  };

  const [formation, setFormation] = React.useState(headers[1]?.title)
  const [badges, setBadges] = React.useState([])

  const onFormationChange = ( value ) => {
    setFormation(value)
    console.log('from onFormationChange', value)
    const filteredEntries = entries.filter(entry => value === entry.Formation)
    console.log('filteredEntries ', filteredEntries)

    const newBadges = filteredEntries.reduce((previousValue, currentValue) => ({
        ...previousValue, 
        [currentValue.Jour] : {
          ...previousValue[currentValue.Jour],
          [currentValue.Date] : currentValue.Cours
        }
      }), {})
    const getMonthNum = (dateString) => getMonth( parse(dateString,'PP', new Date(), { locale: fr }) )
    const getDayNum = (dateString) => getDate( parse(dateString, 'PP', new Date(), { locale: fr }) )

    const badgeData = Object.keys(newBadges)
      .reduce((previousValue, currentValue) => {

        const dayEntry = Object.keys(newBadges[currentValue])
          .map((key) => ({
              color: (key === "AM") ? '#eb2f96' : '#0070f3',
              content: newBadges[currentValue][key]
          }))

        return { ...previousValue, [getMonthNum(currentValue)]: { ...previousValue[getMonthNum(currentValue)], [getDayNum(currentValue)]: dayEntry } }
      }, {})

    console.log('badgeData ', badgeData)
    setBadges(badgeData)
    console.log('badges ', badges)
  };

  return (
    <div className="site-calendar-customize-header-wrapper">
      <Calendar
        dateCellRender={(value) => dateCellRender(value, badges)}
        onFormationChange={onFormationChange}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          const current = value.clone();
          const localeData = value.localeData();
          const months = [];

          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option className="month-item" key={`${index}`}>
                {months[index]}
              </Select.Option>,
            );
          }

          const month = value.month();
          const year = value.year();
          const options = [];

          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }

          const formationOptions = [];

          for (let i = 0; i < headers[1].filters.length; i += 1) {
            formationOptions.push(
              <Select.Option key={i} value={headers[1].filters[i].value} className="formation-item">
                {headers[1].filters[i].value}
              </Select.Option>,
            );
          }

          return (
            <div
              style={{
                padding: 8,
              }}
            >
              
              <Row gutter={8}>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={(selectedMonth) => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth, 10));
                      onChange(newValue);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    value={String(formation)}
                    onChange={(selectedFormation) => onFormationChange(selectedFormation)}
                  >
                    {formationOptions}
                  </Select>
                </Col>
                <Col style={{
                padding: "4px 10px",
              }}>
                  <Badge color={'#eb2f96'} text={"AM"}/>
                </Col>
                <Col style={{
                padding: "4px 10px",
              }}>
                  <Badge color={'#0070f3'} text={"PM"}/>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CalendarWidget;